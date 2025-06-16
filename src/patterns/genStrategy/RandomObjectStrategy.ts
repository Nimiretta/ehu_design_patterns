import { FieldComposite } from '../componentsModels/FieldComposite.js';
import { FieldLeaf } from '../componentsModels/FieldLeaf.js';
import type { JSONValue } from '../componentsModels/FieldComponent.js';
import type { GenCriteria, IGenStrategy } from './GenStrategy.js';
import { RandomStringStrategy } from './RandomStringStrategy.js';
import { RandomNumberStrategy } from './RandomNumberStrategy.js';
import { RandomBooleanStrategy } from './RandomBooleanStrategy.js';

export class RandomObjectStrategy implements IGenStrategy<FieldComposite> {
  generate(name: string, criteria?: GenCriteria): FieldComposite {
    const objectNode = new FieldComposite(name, 'object');
    const keys = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'];
    const numKeys = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numKeys; i++) {
      const key = keys[Math.floor(Math.random() * keys.length)] + i;
      const valueType = ['string', 'number', 'boolean', 'null'][Math.floor(Math.random() * 4)];
      let value: JSONValue;
      switch (valueType) {
        case 'string':
          value = new RandomStringStrategy().generate(key, { length: 5 });
          break;
        case 'number':
          value = new RandomNumberStrategy().generate(key);
          break;
        case 'boolean':
          value = new RandomBooleanStrategy().generate(key);
          break;
        case 'null':
          value = null;
          break;
        default:
          value = '';
      }
      objectNode.add(new FieldLeaf(key, value));
    }
    return objectNode;
  }
}
