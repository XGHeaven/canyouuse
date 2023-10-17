import App from "./App.svelte";
import { initialData } from "./feature-store";

import "./web-components/Feature.svelte";
import "./web-components/default.css";

declare const INITIAL_DATA: any;

// initialData.set(INITIAL_DATA)

// console.log('inital data', INITIAL_DATA)

new App({
  target: document.querySelector("#app")!,
});
