import { FeatureJSON, FeatureStatSupport } from "../../types/feature";
import { Target as OriginTarget, TargetVersion as OriginTargetVersion, Target } from "../../types/target";

export interface RenderFeature {
  target: RenderTarget;
  color: string;
  releasedVersions: RenderFeatureVersion[];
  futureVersions: RenderFeatureVersion[];
  versions: RenderFeatureVersion[];
  currentVersion: RenderFeatureVersion;
  releasedCompactVersions: RenderFeatureCompactVersion[];
  futureCompactVersions: RenderFeatureCompactVersion[];
}

export interface RenderFeatureVersion {
  version: TargetVersion;
  support: FeatureStatSupport;
}

export interface RenderFeatureCompactVersion {
  versions: TargetVersion[];
  support: FeatureStatSupport;
}

export interface TargetVersion extends OriginTargetVersion {}

export interface Feature extends Omit<FeatureJSON, "stats"> {
  id: string;
  notes: string[];

  stats: RenderFeature[];
}

export interface FeatureTargetInfo {}

export interface RenderTarget extends OriginTarget {
  id: string;
}
