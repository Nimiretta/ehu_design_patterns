import { QuadrilateralFactory } from '../../src/factories/QuadrilateralFactory';
import { Point2D } from '../../src/entities/Point2D';
import { Quadrilateral } from '../../src/entities/Quadrilateral';
import { ValidationError } from '../../src/exceptions/CustomExceptions';

describe('QuadrilateralFactory', () => {
  let factory: QuadrilateralFactory;

  beforeEach(() => {
    factory = new QuadrilateralFactory();
  });

  describe('Positive Cases', () => {
    test('should create a valid Point2D', () => {
      const point = factory.createPoint([1, 2]);
      expect(point).toBeInstanceOf(Point2D);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });

    test('should create a valid Quadrilateral', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(4, 3), new Point2D(0, 3)];
      const quad = factory.createShape('quad1', points);
      expect(quad).toBeInstanceOf(Quadrilateral);
      expect(quad.id).toBe('quad1');
      expect(quad.getPoints()).toEqual(points);
    });
  });

  describe('Negative Cases', () => {
    test('should throw error for invalid quadrilateral points', () => {
      const invalidPoints = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
      expect(() => factory.createShape('quad', invalidPoints)).toThrow(ValidationError);
    });
  });
});
