import { html } from "lit";

const template = () => html`
<nav class="navbar flex-row bg-base-300 justify-between">
    <a class="btn btn-ghost normal-case text-xl">Visual Analytics</a>
    <button class="btn" @click=${()=> { window.open("https://github.com/Jason-Choi/reactive-d3-boilerplate")
        }}>Github</button>
</nav>
`;

export default template;
