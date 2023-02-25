import "./index.css";

import { html, render } from "lit";
import { map } from "lit/directives/map.js";

import { Chart } from "./components/chart";
import footer from "./components/footer";
import header from "./components/header";

import { range } from "d3";
import { selected } from "./store";
import {effect} from "@preact/signals-core"


const root = document.getElementById("app")!;

interface Option {
  name: string;
  value: number;
}

const options: Option[] = [
  { name: "Overview", value: 0 },
  { name: "Cluster 1", value: 1 },
  { name: "Cluster 2", value: 2 },
  { name: "Cluster 3", value: 3 },
];

const template = () => {
  return html`
    ${header()}
    <div class="container flex flex-col sm:flex-row mx-auto p-4 justify-center">
      <div class="flex flex-row sm:flex-col gap-4 p-4 mr-20">
        ${map(options, (option) => {
          const { name, value } = option;
          return html`
            <div class="flex flex-row gap-2 bg-base-300 p-3 rounded-md"
                @click=${() => {
                    selected.value = value;
                }}
            >
              <input
                type="radio"
                name="optionradio"
                class="radio"
                ?checked=${selected.value === value}
                
              />
              <label class="option-label">${name}</label>
            </div>
          `;
        })}
      </div>
      <div class="min-h-[80vh] w-full grid grid-auto-fit-[200px] gap-4">
        ${map(range(8), (i) => html`<div id="chart-container-${i}"></div>`)}
      </div>
    </div>
    ${footer()}
  `;
};

effect(() => render(template(), root));


// Initialize Child Components

range(8).forEach((i) => {
  new Chart(400, 400, `chart-container-${i}`);
});
