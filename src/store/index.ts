import { signal } from "@preact/signals-core";

export const selected = signal("Seattle");
export const visualizeData = signal({} as { X: Int32Array; Y: string[] });
