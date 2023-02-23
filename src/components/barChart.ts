import { effect } from "@preact/signals-core";
import * as d3 from "d3";
import { html } from "lit";
import { visualizeData } from "../store";

const margin = { top: 30, right: 0, bottom: 30, left: 50 };
const width = document.body.clientWidth;
const height = 300;

const xRange = [margin.left, width - margin.right];
const yRange = [margin.top, height - margin.bottom];

const bars = d3.create("g").attr("fill", "steelblue");
const texts = d3
  .create("g")
  .append("g")
  .attr("fill", "white")
  .attr("text-anchor", "end")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10);

const xAxisGroup = d3
  .create("g")
  .attr("transform", `translate(0,${margin.top})`);
const yAxisGroup = d3
  .create("g")
  .attr("transform", `translate(${margin.left},0)`);

effect(() => {
  const [X, Y] = [visualizeData.value.X, visualizeData.value.Y];
  if (!X || !Y) return;

  const xScale = d3
    .scaleLinear()
    .range(xRange)
    .domain([0, Math.max(...X)]);
  const yScale = d3.scaleBand().range(yRange).padding(0.1).domain(Y);
  const xAxis = d3.axisTop(xScale).ticks(width / 80);
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

  const I = d3.range(X.length);

  xScale.domain([0, Math.max(...X)]);
  yScale.domain(Y);

  // Update the marks
  bars
    .selectAll("rect")
    .data(I)
    .join("rect")
    .attr("x", xScale(0))
    .attr("y", (i) => yScale(Y[i])!)
    .attr("width", (i) => xScale(X[i]) - xScale(0))
    .attr("height", yScale.bandwidth());

  texts
    .selectAll("text")
    .data(I)
    .join("text")
    .attr("x", (i) => xScale(X[i]))
    .attr("y", (i) => yScale(Y[i])! + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((i) => xScale.tickFormat(100, "d")(X[i])!)
    .call((text) =>
      text
        .filter((i) => xScale(X[i]) - xScale(0) < 20) // short bars
        .attr("dx", +4)
        .attr("fill", "black")
        .attr("text-anchor", "start")
    );

  xAxisGroup.selectAll("*").remove();

  xAxisGroup
    .select<SVGSVGElement>(".xaxis")
    .call(xAxis)
    // add gridlines
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("y2", height - margin.top - margin.bottom)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", width - margin.right)
        .attr("y", -22)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text("Count →")
    );

  yAxisGroup.call(yAxis);
});

const template = () => html`
  <svg
    width="${width}"
    height="${height}"
    viewBox="${[0, 0, width, height]}"
    style="max-width: 100%; height: auto; height: intrinsic;"
  >
    ${xAxisGroup} ${yAxisGroup} ${bars} ${texts}
  </svg>
`;

export default template;
