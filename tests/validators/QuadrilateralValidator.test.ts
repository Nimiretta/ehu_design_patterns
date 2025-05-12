import { QuadrilateralValidator } from '../../src/validators/QuadrilateralValidator';
import { ValidationError } from '../../src/exceptions/CustomExceptions';

describe('QuadrilateralValidator', () => {
  describe('validate', () => {
    describe('Positive Cases', () => {
      it('should validate a valid quadrilateral', () => {
        const points = [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 3 },
          { x: 0, y: 3 },
        ];

        expect(() => QuadrilateralValidator.validate(points)).not.toThrow();
      });
    });

    describe('Negative Cases', () => {
      it('should throw an error if there are not exactly 4 points', () => {
        const points = [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 3 },
        ];

        expect(() => QuadrilateralValidator.validate(points)).toThrow(ValidationError);
        expect(() => QuadrilateralValidator.validate(points)).toThrow('A quadrilateral must have exactly 4 points.');
      });

      it('should throw an error if there are duplicate points', () => {
        const points = [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 0 },
          { x: 0, y: 3 },
        ];

        expect(() => QuadrilateralValidator.validate(points)).toThrow(ValidationError);
        expect(() => QuadrilateralValidator.validate(points)).toThrow('There are duplicated points');
      });

      it('should throw an error if three points are collinear', () => {
        const points = [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 4, y: 0 },
          { x: 0, y: 3 },
        ];

        expect(() => QuadrilateralValidator.validate(points)).toThrow(ValidationError);
        expect(() => QuadrilateralValidator.validate(points)).toThrow(
          'Three points of the quadrilateral are collinear.',
        );
      });
    });
  });
});
