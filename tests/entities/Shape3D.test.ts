import { Shape3D } from '../../src/entities/Shape3D';
import { Point3D } from '../../src/entities/Point3D';

describe('Shape3D', () => {
  class TestShape3D extends Shape3D {
    getVolume() {
      return 0;
    }

    getSurfaceArea() {
      return 0;
    }
  }

  test('should create instance with correct id and points', () => {
    const points = [new Point3D(0, 0, 0), new Point3D(1, 1, 1)];
    const shape = new TestShape3D('testShape3D', points);
    expect(shape.id).toBe('testShape3D');
    expect(shape.getPoints()).toEqual(points);
  });
});
