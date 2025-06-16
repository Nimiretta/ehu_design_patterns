import { ICompositeComponent, IFieldComponent, IAttributable, JSONValue, IJSONObject } from './FieldComponent.js';
import { FieldBase } from './FieldBase.js';
import { validateXmlName } from '../../utils/validationUtils.js';

export class FieldComposite extends FieldBase implements ICompositeComponent, IAttributable {
  public children: IFieldComponent[] = [];
  type: 'object' | 'array';

  constructor(
    public name: string,
    type: 'object' | 'array',
  ) {
    super();
    this.type = type;
  }

  add(child: IFieldComponent) {
    this.children.push(child);
    child.parent = this;
  }

  remove(child: IFieldComponent) {
    this.children = this.children.filter((c) => c !== child);
    child.parent = null;
  }

  getValue(): JSONValue {
    if (this.type === 'object') {
      const obj: IJSONObject = {};
      this.children.forEach((child) => {
        obj[child.name] = child.getValue();
      });
      return obj;
    } else {
      return this.children.map((child) => child.getValue());
    }
  }

  validate(format: 'json' | 'xml'): string[] {
    let errors: string[] = [];
    if (!this.name && format === 'xml') errors.push('Tag name cannot be empty');
    if (format === 'xml') {
      errors.push(...validateXmlName(this.name, 'tag'));
    }
    if (this.type === 'object') {
      const keys = this.children.map((c) => c.name);
      const duplicates = keys.filter((k, i) => keys.indexOf(k) !== i);
      if (duplicates.length) errors.push(`Duplicate field names on one level: ${[...new Set(duplicates)].join(', ')}`);
    }
    errors = errors.concat(this.validateAttributes());
    this.children.forEach((child) => {
      errors = errors.concat(child.validate(format));
    });
    return errors;
  }

  isComposite(): boolean {
    return true;
  }
}
