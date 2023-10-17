import { writable } from "svelte/store";

let _targets: any = null;

export const targets = writable(null, (set) => {
  // TODO: init target
  return () => {};
});
