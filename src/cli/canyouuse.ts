import { Config } from "./config";
import { resolveConfig } from "./resolve-config";
import { fs, path } from "./mods";
import { createFeature } from "./feature";
import { formatJSON } from "./utils";

export class CanYouUse {
  static async create(projectDir: string) {
    const config = await resolveConfig(projectDir);

    if (config) {
      return new CanYouUse(projectDir, config);
    }
    return null;
  }

  featureDir: string;
  targetFilePath: string;

  constructor(
    public projectDir: string,
    public config: Config
  ) {
    this.featureDir = path.join(projectDir, config.featureDir ?? "features");
    this.targetFilePath = path.join(projectDir, config.targetConfigPath ?? "targets.json");
  }

  async createFeature(
    featureName: string,
    options: {
      title?: string;
      description?: string;
    } = {}
  ) {
    await fs.mkdir(this.featureDir, { recursive: true });
    const featureFile = path.join(this.featureDir, featureName + ".json");
    const featureFileDir = path.dirname(featureFile);
    await fs.mkdir(featureFileDir, { recursive: true });

    const feature = createFeature();
    await fs.writeFile(featureFile, formatJSON(feature), "utf8");
  }

  async getTargets() {
    if (await fs.stat(this.targetFilePath)) {
      return JSON.parse(await fs.readFile(this.targetFilePath, "utf8"));
    } else {
      return {};
    }
  }

  async getTargetName() {}

  async createTarget(targetName: string, version: string, options: {}) {
    const currentTargets = await this.getTargets();

    if (targetName) {
    }
  }

  async buildUI() {
    const uiFolder = path.join(this.projectDir, this.config.ui?.outDir ?? "public");
    const templateFolder = path.join(__dirname, "theme");
    await fs.copy(templateFolder, uiFolder, {
      recursive: true,
    });
  }
}
