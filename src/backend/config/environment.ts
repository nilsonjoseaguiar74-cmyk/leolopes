export interface BackendEnvironment {
  nodeEnv: string;
  appName: string;
  apiBaseUrl: string;
  logLevel: string;
}

export function getBackendEnvironment(): BackendEnvironment {
  return {
    nodeEnv: process.env["NODE_ENV"] ?? "development",
    appName: process.env["APP_NAME"] ?? "leonardo-os",
    apiBaseUrl: process.env["API_BASE_URL"] ?? "/api",
    logLevel: process.env["LOG_LEVEL"] ?? "info",
  };
}
