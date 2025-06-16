import { IFieldComponent, IAttributable, JSONValue } from './FieldComponent.js';
import { FieldBase } from './FieldBase.js';
import { validateXmlName } from '../../utils/validationUtils.js';

export class FieldLeaf extends FieldBase implements IFieldComponent, IAttributable {
  type: 'value' = 'value';

  constructor(
    public name: string,
    private value: JSONValue,
  ) {
    super();
  }

  getValue() {
    return this.value;
  }

  validate(format: 'json' | 'xml'): string[] {
    let errors: string[] = [];
    if (!this.name) errors.push('Field name cannot be empty');
    if (format === 'xml') {
      errors.push(...validateXmlName(this.name, 'tag'));
    }
    errors = errors.concat(this.validateAttributes());
    return errors;
  }

  isComposite(): boolean {
    return false;
  }
}
