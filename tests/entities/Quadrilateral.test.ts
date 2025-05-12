import { Quadrilateral } from '../../src/entities/Quadrilateral';
import { Point2D } from '../../src/entities/Point2D';

describe('Quadrilateral', () => {
  describe('Positive Cases', () => {
    test('should calculate area correctly', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(4, 3), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad1', points);
      expect(quad.getArea()).toBe(12);
    });

    test('should calculate perimeter correctly', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(4, 3), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad1', points);
      expect(quad.getPerimeter()).toBe(14);
    });

    test('should identify square', () => {
      const points = [new Point2D(0, 0), new Point2D(2, 0), new Point2D(2, 2), new Point2D(0, 2)];
      const quad = new Quadrilateral('quad2', points);
      expect(quad.isSquare()).toBe(true);
    });

    test('should identify rhombus', () => {
      const points = [new Point2D(0, 0), new Point2D(2, 1), new Point2D(0, 2), new Point2D(-2, 1)];
      const quad = new Quadrilateral('quad3', points);
      expect(quad.isRhombus()).toBe(true);
    });

    test('should identify trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(3, 2), new Point2D(1, 2)];
      const quad = new Quadrilateral('quad4', points);
      expect(quad.isTrapezoid()).toBe(true);
    });

    test('should identify a valid trapezoid with vertical parallel sides', () => {
      const points = [new Point2D(0, 0), new Point2D(0, 4), new Point2D(2, 3), new Point2D(2, 1)];
      const quad = new Quadrilateral('quad2', points);
      expect(quad.isTrapezoid()).toBe(true);
    });
  });

  describe('Negative Cases', () => {
    test('should not identify non-square as square', () => {
      const points = [new Point2D(0, 0), new Point2D(3, 0), new Point2D(3, 2), new Point2D(0, 2)];
      const quad = new Quadrilateral('quad6', points);
      expect(quad.isSquare()).toBe(false);
    });

    test('should not identify concave quadrilateral as convex', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(2, 1), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad7', points);
      expect(quad.isConvex()).toBe(false);
    });

    test('should not identify non-rhombus as rhombus', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(4, 3), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad8', points);
      expect(quad.isRhombus()).toBe(false);
    });

    test('should not identify non-trapezoid as trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(3, 2), new Point2D(1, 4)];
      const quad = new Quadrilateral('quad9', points);
      expect(quad.isTrapezoid()).toBe(false);
    });

    test('should not identify a parallelogram as a trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(5, 2), new Point2D(1, 2)];
      const quad = new Quadrilateral('quad3', points);
      expect(quad.isTrapezoid()).toBe(false);
    });

    test('should not identify a rectangle as a trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(4, 3), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad4', points);
      expect(quad.isTrapezoid()).toBe(false);
    });

    test('should not identify a general quadrilateral as a trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(3, 2), new Point2D(1, 4)];
      const quad = new Quadrilateral('quad5', points);
      expect(quad.isTrapezoid()).toBe(false);
    });

    test('should not identify a concave quadrilateral as a trapezoid', () => {
      const points = [new Point2D(0, 0), new Point2D(4, 0), new Point2D(2, 1), new Point2D(0, 3)];
      const quad = new Quadrilateral('quad6', points);
      expect(quad.isTrapezoid()).toBe(false);
    });
  });
});
