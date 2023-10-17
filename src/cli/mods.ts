import Yargs from "yargs";
import { hideBin } from "yargs/helpers";

export { Yargs };

export function getCurrentArgv() {
  return hideBin(process.argv);
}

export function getPwd() {
  return process.cwd();
}

export * as cosmiconfig from "cosmiconfig";

export * as fs from "fs-extra";

import path from "path";
export { path };
