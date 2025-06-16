import type { JSONValue } from '../componentsModels/FieldComponent.js';
import type { GenCriteria, IGenStrategy } from './GenStrategy.js';

export class ManualStrategy implements IGenStrategy<JSONValue> {
  private lastValue: JSONValue = '';

  setValue(value: JSONValue) {
    this.lastValue = value;
  }

  generate(name: string, criteria?: GenCriteria): JSONValue {
    return this.lastValue;
  }
}
