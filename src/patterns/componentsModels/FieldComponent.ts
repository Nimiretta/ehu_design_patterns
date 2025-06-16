import { ExportFormat } from '../AppConfigSingleton';

export type JSONValue = string | number | boolean | null | IJSONObject | IJSONArray;

export interface IJSONObject {
  [key: string]: JSONValue;
}

export interface IJSONArray extends Array<JSONValue> {}

export interface IXmlAttribute {
  name: string;
  value: string;
}

export interface IFieldComponent {
  name: string;
  getValue(): JSONValue;
  validate(format: ExportFormat): string[];
  type: 'object' | 'array' | 'value';
  isComposite(): boolean;
  parent?: ICompositeComponent | null;
}

export interface IAttributable {
  attributes: IXmlAttribute[];
  addAttribute(attr: IXmlAttribute): void;
  removeAttribute(attrName: string): void;
}

export interface ICompositeComponent extends IFieldComponent {
  children: IFieldComponent[];
  add(child: IFieldComponent): void;
  remove(child: IFieldComponent): void;
}
