import type { NumberCriteria, IGenStrategy } from './GenStrategy.js';

export class RandomNumberStrategy implements IGenStrategy<number> {
  generate(name: string, criteria?: NumberCriteria): number {
    const min = typeof criteria?.min === 'number' ? criteria.min : 0;
    const max = typeof criteria?.max === 'number' ? criteria.max : 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
