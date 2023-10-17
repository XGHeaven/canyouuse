// ID 和文件名保持一致
export interface FeatureJSON {
  // feature unique name
  name: string;
  // readable feature name
  title?: string;
  // readable feature description
  description?: string;
  // feature spec link
  spec?: string;
  status?: "";
  // extra links
  links?: string[];
  // extra issues
  issues?: string[];
  // extra notes
  notes?: string[];
  // extra stats
  stats?: FeatureStats;

  // other extra
  extra?: any;

  // child feature, key is the feature name
  children?: Record<string, FeatureJSON>;
}

export type FeatureStats = Record<string, FeatureStat>;

export type FeatureStat = Record<string, FeatureStatString>;

export type FeatureStatUnknownToken = "u" | "unknown";
export type FeatureStatYesToken = "y" | "yes";
export type FeatureStatNoToken = "n" | "no";
export type FeatureStatPartialToken = "p" | "partial";
export type FeatureStateValidToken =
  | FeatureStatUnknownToken
  | FeatureStatYesToken
  | FeatureStatNoToken
  | FeatureStatPartialToken;

export type FeatureStatString = `${FeatureStateValidToken}` | `${FeatureStateValidToken}#${number}`;

export interface FeatureStatSupport {
  isFullSupport: boolean;
  isPartialSupport: boolean;
  note: number;
  stat: string;
}
