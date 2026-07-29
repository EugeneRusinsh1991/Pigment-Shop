export interface SmokeConfig {
  failOnConsoleError: boolean;
  failOnConsoleWarn: boolean;
  navigationTimeout: number;
  screenshotOnFailure: boolean;
  continueAfterError: boolean;
  maxAllowedFailures: number;
}

export const defaultSmokeConfig: SmokeConfig = {
  failOnConsoleError: true,
  failOnConsoleWarn: false,
  navigationTimeout: 10000,
  screenshotOnFailure: false,
  continueAfterError: true,
  maxAllowedFailures: 50
};
