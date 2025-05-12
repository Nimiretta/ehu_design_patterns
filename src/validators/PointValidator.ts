import { ValidationError } from '../exceptions/CustomExceptions';

export class PointValidator {
  static parseCoords(tokens: string[], count: number): number[] {
    if (tokens.length < count) {
      throw new ValidationError(`Expected ${count} numbers, but got ${tokens.length}`);
    }
    return tokens.slice(0, count).map((t) => {
      const v = parseFloat(t);
      if (Number.isNaN(v)) throw new ValidationError(`Invalid number: ${t}`);
      return v;
    });
  }
}
