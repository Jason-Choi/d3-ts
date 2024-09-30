import { signal } from "@preact/signals-core";
import * as d3 from "d3";

export const selected = signal<number>(0);

const prepareData = () => {
    const random = d3.randomNormal(0, 0.2);
    const sqrt3 = Math.sqrt(3);
    const cluster1 = d3.range(1000).map(() => [random() + sqrt3, random() + 1, 1]);
    const cluster2 = d3.range(1000).map(() => [random() - sqrt3, random() + 1, 2]);
    const cluster3 = d3.range(1000).map(() => [random(), random() - 1, 3]);
    return d3.shuffle([...cluster1, ...cluster2, ...cluster3]);
}

export const data = prepareData();
