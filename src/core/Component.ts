import { effect } from "@preact/signals-core"
import { html, render } from "lit";
import type { TemplateResult } from "lit";


export default interface Component {
    id: string;

    constructor: (id: string) => void;
    template: () => TemplateResult;
    render: () => void;
}

