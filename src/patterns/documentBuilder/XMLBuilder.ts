import { toXML, prettyPrintXML } from '../../utils/toXMLUtils.js';
import type { IFieldComponent } from '../componentsModels/FieldComponent.js';
import { IDocumentBuilder } from './IDocumentBuilder.js';

export class XMLBuilder implements IDocumentBuilder {
  private xml: string = '';

  reset() {
    this.xml = '';
  }

  addField(field: IFieldComponent) {
    this.xml += toXML(field);
  }

  getResult(): string {
    return this.xml;
  }

  buildPretty(field: IFieldComponent): string {
    return prettyPrintXML(field);
  }
}
