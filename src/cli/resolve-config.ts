import { Config } from "./config";
import { cosmiconfig } from "./mods";

export async function resolveConfig(projectDir: string): Promise<Config | null> {
  const explorer = cosmiconfig.cosmiconfig("canyouuse");
  const result = await explorer.search(projectDir);

  return result?.config;
}
