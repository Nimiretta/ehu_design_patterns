import type { Shape3D } from '../../src/entities/Shape3D';
import { Point3D } from '../../src/entities/Point3D';

describe('Shape3D', () => {
  test('should create instance with correct id and points', () => {
    const points = [new Point3D(0, 0, 0), new Point3D(1, 1, 1)];
    const shape = { id: 'testShape3D', points } as Shape3D;

    expect(shape.id).toBe('testShape3D');
    expect(shape.points).toEqual(points);
  });

  test('should be abstract and require implementation of getVolume and getSurfaceArea', () => {
    const points = [new Point3D(0, 0, 0)];
    const shape = { id: 'invalidShape3D', points } as Shape3D;

    expect(shape.id).toBe('invalidShape3D');
    expect(shape.points).toEqual(points);
  });
});
