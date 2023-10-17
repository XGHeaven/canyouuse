import { FeatureJSON } from "../types/feature";

export function createFeature(): FeatureJSON {
  return {
    name: "",
    title: "",
    description: "",
    spec: "",
    status: "",
    links: [],
    issues: [],
    extra: {},
    stats: {},
    notes: [],
  };
}
