import { FieldComposite } from '../componentsModels/FieldComposite.js';
import { FieldLeaf } from '../componentsModels/FieldLeaf.js';
import type { JSONValue } from '../componentsModels/FieldComponent.js';
import type { GenCriteria, IGenStrategy } from './GenStrategy.js';
import { RandomStringStrategy } from './RandomStringStrategy.js';
import { RandomNumberStrategy } from './RandomNumberStrategy.js';
import { RandomBooleanStrategy } from './RandomBooleanStrategy.js';

export class RandomArrayStrategy implements IGenStrategy<FieldComposite> {
  generate(name: string, criteria?: GenCriteria): FieldComposite {
    const arrayNode = new FieldComposite(name, 'array');
    const length = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < length; i++) {
      const elementType = ['string', 'number', 'boolean', 'null'][Math.floor(Math.random() * 4)];
      let elementValue: JSONValue;
      switch (elementType) {
        case 'string':
          elementValue = new RandomStringStrategy().generate(`item${i}`, { length: 5 });
          break;
        case 'number':
          elementValue = new RandomNumberStrategy().generate(`item${i}`);
          break;
        case 'boolean':
          elementValue = new RandomBooleanStrategy().generate(`item${i}`);
          break;
        case 'null':
          elementValue = null;
          break;
        default:
          elementValue = '';
      }
      arrayNode.add(new FieldLeaf(i.toString(), elementValue));
    }
    return arrayNode;
  }
}
