import { PointValidator } from '../../src/validators/PointValidator';
import { ValidationError } from '../../src/exceptions/CustomExceptions';

describe('PointValidator', () => {
  describe('parseCoords', () => {
    describe('Positive Cases', () => {
      it('should parse valid tokens into numbers', () => {
        const tokens = ['1.5', '2.3', '3.7'];
        const count = 3;

        const result = PointValidator.parseCoords(tokens, count);

        expect(result).toEqual([1.5, 2.3, 3.7]);
      });

      it('should parse only the required number of tokens', () => {
        const tokens = ['1.5', '2.3', '3.7', '4.1'];
        const count = 3;

        const result = PointValidator.parseCoords(tokens, count);

        expect(result).toEqual([1.5, 2.3, 3.7]);
      });
    });

    describe('Negative Cases', () => {
      it('should throw an error if tokens length is less than required count', () => {
        const tokens = ['1.5', '2.3'];
        const count = 3;

        expect(() => PointValidator.parseCoords(tokens, count)).toThrow(ValidationError);
        expect(() => PointValidator.parseCoords(tokens, count)).toThrow('Expected 3 numbers, but got 2');
      });

      it('should throw an error if any token is not a valid number', () => {
        const tokens = ['1.5', 'abc', '3.7'];
        const count = 3;

        expect(() => PointValidator.parseCoords(tokens, count)).toThrow(ValidationError);
        expect(() => PointValidator.parseCoords(tokens, count)).toThrow('Invalid number: abc');
      });
    });
  });
});
