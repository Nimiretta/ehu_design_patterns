export class AppConfig {
  private static instance: AppConfig;
  public exportFormat: 'json' | 'xml' = 'json';

  private constructor() {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}
