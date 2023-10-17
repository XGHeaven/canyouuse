import { FeatureStatSupport, FeatureStats } from "../../types/feature";
import { Target, CuuTargetsJSON, TargetVersion } from "../../types/target";
import {
  RenderFeature,
  RenderTarget as FeatureTypeTarget,
  RenderFeatureVersion,
  RenderFeatureCompactVersion,
} from "./feature-type";
import { resolveVersion } from "../../common/version-resolver";
import { isEqualSupport, resolveStat } from "../../common/stat-resolver";

export function groupVersion(versions: string[], stats: string[]) {
  let prevStat = stats[0];
  const groups: [string[], string][] = [[[versions[0]], prevStat]];

  for (let i = 1; i < versions.length; i++) {
    if (stats[i] !== prevStat) {
      groups.push([[versions[i]], stats[i]]);
    } else {
      groups[groups.length - 1][0].push(versions[i]);
    }

    prevStat = stats[i];
  }
}

export function processFeatureVersion(version: TargetVersion, stat: string) {
  return {
    version,
    support: resolveStat(stat),
  };
}

export function processFeatureStats(stats: FeatureStats, targets: Target[]): RenderFeature[] {
  return targets.map<RenderFeature>((target) => {
    const { versions } = target;

    const targetName = target.name;
    const versionsString = versions.map((v) => v.version);

    const stat = stats[target.name];

    const dots = resolveVersion(versionsString, stat);
    console.log(dots);

    let lastReleasedIndex = versions.length - 1;
    for (; lastReleasedIndex >= 0; lastReleasedIndex--) {
      if (versions[lastReleasedIndex].type === "release") {
        break;
      }
    }

    if (lastReleasedIndex < 0) {
      // TODO: throw error
    }

    const featureVersions = versions.map((v, i) => processFeatureVersion(v, dots[i]));

    const released = featureVersions.slice(0, lastReleasedIndex);
    const futured = featureVersions.slice(lastReleasedIndex + 1);

    const feature: RenderFeature = {
      target: processTarget(targetName, target),
      color: `var(--cuu-feature-target-color-${targetName})`,
      versions: featureVersions,
      currentVersion: featureVersions[lastReleasedIndex],
      releasedVersions: released,
      futureVersions: futured,
      futureCompactVersions: compactFeatureVersions(futured),
      releasedCompactVersions: compactFeatureVersions(released),
    };

    return feature;
  });
}

export function processTarget(id: string, target: Target): FeatureTypeTarget {
  return {
    id,
    ...target,
  };
}

export function compactFeatureVersions(versions: RenderFeatureVersion[]) {
  let preSupport: FeatureStatSupport | undefined = undefined;
  const results: RenderFeatureCompactVersion[] = [];
  let pre = 0;
  for (let i = 1; i < versions.length; i++) {
    if (!isEqualSupport(versions[pre].support, versions[i].support)) {
      results.push({
        support: versions[pre].support,
        versions: versions.slice(pre, i).map((v) => v.version),
      });
      pre = i;
    }
  }

  results.push({
    support: versions[pre].support,
    versions: versions.slice(pre).map((v) => v.version),
  });

  return results;
}
