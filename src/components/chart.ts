import { effect } from "@preact/signals-core";
import * as d3 from "d3";
import { ZoomTransform } from "d3";
import { render } from "lit";
import { data, selected } from "../store";

const groupedData = d3.groups(data, (d) => d[2]);
const clusterIds = groupedData.map((d) => d[0]);

export class Chart {
    container: HTMLDivElement;
    width: number;
    height: number;
    svg: d3.Selection<SVGSVGElement, any, any, any>;

    k: number;
    x: d3.ScaleLinear<number, any, any>;
    y: d3.ScaleLinear<number, any, any>;
    z: d3.ScaleOrdinal<string, any, any>;

    xAxis: (
        g: d3.Selection<SVGGElement, any, any, any>,
        x: d3.ScaleLinear<number, any, any>
    ) => d3.Selection<SVGGElement, any, any, any>;
    yAxis: (
        g: d3.Selection<SVGGElement, any, any, any>,
        y: d3.ScaleLinear<number, any, any>
    ) => d3.Selection<SVGGElement, any, any, any>;
    generateTransform: (id: number) => d3.ZoomTransform;

    constructor(width: number, height: number, container: string) {
        this.container = document.querySelector(`#${container}`)!;
        this.width = width;
        this.height = height;
        this.svg = d3
            .create("svg")

        this.svg
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height);

        this.svg.append("g").attr("class", `x-axis`);
        this.svg.append("g").attr("class", `y-axis`);
        this.svg
            .append("g")
            .attr("class", `g`)
            .attr("fill", "none")
            .attr("stroke-linecap", "round");

        this.k = this.height / this.width;
        this.x = d3.scaleLinear().domain([-4.5, 4.5]).range([0, this.width]);
        this.y = d3
            .scaleLinear()
            .domain([-4.5 * this.k, 4.5 * this.k])
            .range([this.height, 0]);
        this.z = d3
            .scaleOrdinal()
            .domain(data.map((d) => String(d[2])))
            .range(d3.schemeCategory10);

        this.xAxis = (g, x) => g
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisTop(x).ticks(12))
            .call((g) => g.select(".domain").attr("display", "none"));

        this.yAxis = (g, y) => g
            .call(d3.axisRight(y).ticks(12 * this.k))
            .call((g) => g.select(".domain").attr("display", "none"));

        this.generateTransform = (clusterId) => {
            if (clusterIds.includes(clusterId)) {
                const idx = clusterIds.indexOf(clusterId);
                const data = groupedData[idx][1];

                const [x0, x1] = d3.extent(data, (d) => d[0]).map((d) => this.x(d!));
                const [y1, y0] = d3.extent(data, (d) => d[1]).map((d) => this.y(d!));
                const k =
                    0.9 * Math.min(this.width / (x1 - x0), this.height / (y1 - y0));
                const tx = (this.width - k * (x0 + x1)) / 2;
                const ty = (this.height - k * (y0 + y1)) / 2;

                return d3.zoomIdentity.translate(tx, ty).scale(k);
            } else {
                return d3.zoomIdentity;
            }
        };

        // render the chart
        render(this.svg.node()!, this.container);

        // for state based rerendering
        effect(() => {
            this.update();
        });
    }

    render() {
        console.log("render")
        render(this.svg.node()!, this.container);
    }

    update() {
        console.log("update")
        const gx: d3.Selection<SVGGElement, any, any, any> = this.svg.select(`.x-axis`);
        const gy: d3.Selection<SVGGElement, any, any, any> = this.svg.select(`.y-axis`);
        const g = this.svg.select(".g");

        g.selectAll("path")
            .data(data)
            .join("path")
            .attr("d", (d) => `M${this.x(d[0])},${this.y(d[1])}h0`)
            .attr("stroke", (d) => this.z(String(d[2])) as string);

        const zoomed = (event: any) => {
            const transform: ZoomTransform = event.transform;
            g.attr("transform", String(transform)).attr("stroke-width", 5 / transform.k);
            gx.call(this.xAxis, transform.rescaleX(this.x));
            gy.call(this.yAxis, transform.rescaleY(this.y));
        };
        const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", zoomed);

        this.svg
            .transition()
            .duration(1000)
            .call(zoom.transform, this.generateTransform(selected.value));
    }
}
