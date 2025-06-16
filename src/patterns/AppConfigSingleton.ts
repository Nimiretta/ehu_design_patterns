export type ExportFormat = 'json' | 'xml';

export class AppConfig {
  private static instance: AppConfig;
  public exportFormat: ExportFormat = 'json';

  // Форматные правила
  public readonly formats = {
    json: {
      valueTypes: ['string', 'number', 'boolean', 'null', 'object', 'array'],
      attributes: false,
    },
    xml: {
      valueTypes: ['string', 'number', 'boolean', 'object'],
      attributes: true,
    },
  } as const;

  private constructor() {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  getAllowedValueTypes(): string[] {
    return this.formats[this.exportFormat].valueTypes.slice();
  }

  isAttributesEnabled(): boolean {
    return this.formats[this.exportFormat].attributes;
  }
}
