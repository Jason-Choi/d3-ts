import { effect } from "@preact/signals-core";
import "./index.scss";

import { html, render } from "lit";
import { map } from "lit/directives/map.js";

import json from "./weather.json";

import barChart from "./components/barChart";
import footer from "./components/footer";
import header from "./components/header";
import { selected, visualizeData } from "./store";

const root = document.getElementById("app")!;

effect(() => {
  const data: Table<{ weather: Utf8; cnt: Int32 }> = await conn.query(`
        SELECT weather, count(*)::INT as cnt
        FROM weather.json
        WHERE location = '${selected.value}'
        GROUP BY weather
        ORDER BY cnt DESC
    `);

  const X = data.getChild("cnt")!.toArray();
  const Y = data
    .getChild("weather")!
    .toJSON()
    .map((d: any) => `${d}`);

  visualizeData.value = { X, Y };
});

console.log(parquet);
const res = await fetch(parquet);
await db.registerFileBuffer(
  "weather.json",
  new Uint8Array(await res.arrayBuffer())
);

const locations: Table<{ location: Utf8 }> = await conn.query(`
    SELECT DISTINCT location
    FROM weather.json
`);

const handler = (location: string) => {
  selected.value = location;
};

const template = () => html`
  <div>
    ${header()}

    <div class="container">
      <select
        @change=${(e: any) => {
          handler(e.target.value);
        }}
      >
        ${map(
          locations,
          (location: { location: Utf8 }) =>
            html`<option>${location.location}</option>`
        )}
      </select>
    </div>
    ${barChart()} ${footer()}
  </div>
`;
effect(() => render(template(), root));
