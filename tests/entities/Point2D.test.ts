import { Point2D } from '../../src/entities/Point2D';

describe('Point2D', () => {
  test('should create instance with correct coordinates', () => {
    const point = new Point2D(2, 3);
    expect(point.x).toBe(2);
    expect(point.y).toBe(3);
  });

  test('should inherit from Point', () => {
    const point = new Point2D(1, 1);
    expect(point).toBeInstanceOf(Point2D);
  });
});
