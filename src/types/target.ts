export type CuuTargetsJSON = Record<string, Target>;

// ID 和 key 保持一致
export interface Target {
  // unique name, lower case
  name: string;
  // readable name
  title?: string;
  // 描述
  description?: string;
  // must be ordered
  versions: TargetVersion[];
}

export interface TargetVersion {
  // 版本唯一标识
  version: string;
  type?: "release" | "canary";
  website?: string;
  releasedDate?: string;
  changelog?: string;
}
