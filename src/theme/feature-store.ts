import { writable } from "svelte/store";

export interface FeatureBaseInfo {
  id: string;
  title: string;
}

export const initialData = writable({});

export const inited = writable(false);

export const featureBaseInfos = writable<FeatureBaseInfo[]>([]);

declare const __FEATURE_BASE_INFOS__: any;

if (typeof __FEATURE_BASE_INFOS__ !== "undefined") {
  featureBaseInfos.set(__FEATURE_BASE_INFOS__);
}
