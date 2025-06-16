import { AppConfig } from './AppConfigSingleton.js';
import { JSONBuilder, XMLBuilder } from './documentBuilder/index.js';
import type { IFieldComponent } from './componentsModels/FieldComponent.js';

const builderMap = {
  json: {
    Builder: JSONBuilder,
    mime: 'application/json',
    ext: 'json',
  },
  xml: {
    Builder: XMLBuilder,
    mime: 'application/xml',
    ext: 'xml',
  },
};

export class ExportFacade {
  static export(root: IFieldComponent): { data: string; mime: string; ext: string } {
    const config = AppConfig.getInstance();
    const entry = builderMap[config.exportFormat as keyof typeof builderMap];
    if (!entry) {
      throw new Error(`Unsupported export format: ${config.exportFormat}`);
    }
    const builder = new entry.Builder();
    builder.reset();
    builder.addField(root);
    const data = builder.getResult();
    return {
      data,
      mime: entry.mime,
      ext: entry.ext,
    };
  }
}
