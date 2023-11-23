/* tslint:disable */
export type CompilerSelectionDto = {
  providerName?: string;
  qpuName?: string;
  circuitLanguage?: string;
  circuitName?: string;
  circuitUrl?: string;
  qasmCode?: string;
  tokens?: Map<string, string>;
  refreshToken?: string;
};
