import { FeatureJSON } from "./feature";
import { CuuTargetsJSON } from "./target";

export interface CuuContext {
  targets: CuuTargetsJSON;
  // control the order of the display
  targetDisplayOrder?: string[];

  // fetch feature from remote if feature json is empty
  fetchFeatures?: (featureNames: string[]) => Promise<FeatureJSON[]>;
}
