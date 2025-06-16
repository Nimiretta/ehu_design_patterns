import type { IFieldComponent } from '../componentsModels/FieldComponent.js';

export interface IDocumentBuilder {
  reset(): void;
  addField(field: IFieldComponent): void;
  getResult(): string;
}
