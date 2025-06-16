import { validateXmlName, validateXmlAttributeValue } from '../../utils/validationUtils.js';
import { ExportFormat } from '../AppConfigSingleton.js';
import { IFieldComponent, IAttributable, IXmlAttribute, JSONValue, ICompositeComponent } from './FieldComponent.js';

export abstract class FieldBase implements IFieldComponent, IAttributable {
  attributes: IXmlAttribute[] = [];
  parent: ICompositeComponent | null = null;
  abstract name: string;
  abstract type: 'object' | 'array' | 'value';
  abstract getValue(): JSONValue;
  abstract validate(format: ExportFormat): string[];
  abstract isComposite(): boolean;

  addAttribute(attr: IXmlAttribute) {
    if (this.attributes.some((a) => a.name === attr.name)) throw new Error('Attribute name must be unique');
    this.attributes.push(attr);
  }

  removeAttribute(attrName: string) {
    this.attributes = this.attributes.filter((a) => a.name !== attrName);
  }

  protected validateAttributes(): string[] {
    const errors: string[] = [];
    const attrNames = this.attributes.map((a) => a.name);
    const dupAttrs = attrNames.filter((n, i) => attrNames.indexOf(n) !== i);
    if (dupAttrs.length) errors.push(`Duplicate attribute(s): ${[...new Set(dupAttrs)].join(', ')}`);
    this.attributes.forEach((attr) => {
      errors.push(...validateXmlName(attr.name, 'attribute'));
      errors.push(...validateXmlAttributeValue(attr.value));
    });
    return errors;
  }
}
