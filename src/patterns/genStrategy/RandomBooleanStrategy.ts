import type { GenCriteria, IGenStrategy } from './GenStrategy.js';

export class RandomBooleanStrategy implements IGenStrategy<boolean> {
  generate(name: string, criteria?: GenCriteria): boolean {
    return Math.random() < 0.5;
  }
}
