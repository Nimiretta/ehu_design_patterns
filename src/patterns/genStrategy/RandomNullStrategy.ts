import type { GenCriteria, IGenStrategy } from './GenStrategy.js';

export class RandomNullStrategy implements IGenStrategy<null> {
  generate(name: string, criteria?: GenCriteria): null {
    return null;
  }
}
