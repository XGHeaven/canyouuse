import { FeatureStatSupport } from "../types/feature";

// 'u', 'unknown' is unknown
// 'y', 'yes' is full supported
// 'p', 'partial' is partial support
// 'n', 'no' is not supported
// '#num' is a note number
export function resolveStat(statString: string): FeatureStatSupport {
  const [mainStatus, noteNumber] = statString.split("#");

  const support: FeatureStatSupport = {
    isFullSupport: false,
    isPartialSupport: false,
    note: 0,
    stat: statString,
  };

  if (mainStatus === "y") {
    support.isPartialSupport = support.isFullSupport = true;
  } else if (mainStatus === "p") {
    support.isPartialSupport = true;
  } else if (mainStatus === "n") {
    support.isPartialSupport = support.isFullSupport = false;
  }

  if (noteNumber) {
    support.note = parseInt(noteNumber, 10);
  }

  return support;
}

export function isEqualSupport(a: FeatureStatSupport, b: FeatureStatSupport) {
  return a.stat === b.stat;
}
