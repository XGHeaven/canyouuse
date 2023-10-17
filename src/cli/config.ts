export interface Config {
  featureDir?: string;
  featureTemplatePath?: string;
  targetConfigPath?: string;
  ui?: UIConfig;
  theme?: string;
  themeConfig?: any;
}

export interface UIConfig {
  outDir?: string;
}
