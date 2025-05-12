import { Point3D } from '../../src/entities/Point3D';

describe('Point3D', () => {
  test('should create instance with correct coordinates', () => {
    const point = new Point3D(2, 3, 4);
    expect(point.x).toBe(2);
    expect(point.y).toBe(3);
    expect(point.z).toBe(4);
  });

  test('should inherit from Point', () => {
    const point = new Point3D(1, 1, 1);
    expect(point).toBeInstanceOf(Point3D);
  });
});
