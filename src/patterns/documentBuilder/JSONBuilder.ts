import type { IFieldComponent, IJSONObject } from '../componentsModels/FieldComponent.js';
import { IDocumentBuilder } from './IDocumentBuilder.js';

export class JSONBuilder implements IDocumentBuilder {
  private obj: IJSONObject = {};

  reset() {
    this.obj = {};
  }

  addField(field: IFieldComponent) {
    Object.assign(this.obj, field.getValue());
  }

  getResult(): string {
    return JSON.stringify(this.obj, null, 2);
  }

  buildPretty(field: IFieldComponent): string {
    return JSON.stringify(field.getValue(), null, 4);
  }
}
