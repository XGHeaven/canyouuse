// versions 是有序的，按照 stats 的数组进行分段处理
export function resolveVersion(versions: string[], versionStat?: Record<string, string>) {
  const versionDots = versions.map((v) => "");

  if (!versionStat) {
    return versionDots.map(() => "u");
  }

  const defaults = versionStat["0"] ?? "u";
  versionDots[0] = defaults;

  for (const version of Object.keys(versionStat)) {
    if (version === "0") {
      continue;
    }
    const index = versions.indexOf(version);
    versionDots[index] = versionStat[version];
  }

  for (let i = 1; i < versionDots.length; i++) {
    if (!versionDots[i]) {
      versionDots[i] = versionDots[i - 1];
    }
  }

  return versionDots;
}
