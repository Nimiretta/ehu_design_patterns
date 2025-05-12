import { CubeFactory } from '../../src/factories/CubeFactory';
import { Point3D } from '../../src/entities/Point3D';
import { Cube } from '../../src/entities/Cube';
import { InvalidDataException } from '../../src/exceptions/CustomExceptions';

describe('CubeFactory', () => {
  let factory: CubeFactory;

  beforeEach(() => {
    factory = new CubeFactory();
  });

  describe('Positive Cases', () => {
    test('should create a valid Point3D', () => {
      const point = factory.createPoint([1, 2, 3]);
      expect(point).toBeInstanceOf(Point3D);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });

    test('should create a valid Cube', () => {
      const point = new Point3D(0, 0, 0);
      const cube = factory.createShape('cube1', [point], 3);
      expect(cube).toBeInstanceOf(Cube);
      expect(cube.id).toBe('cube1');
      expect(cube.points).toEqual([point]);
      expect(cube.sideLength).toBe(3);
    });
  });

  describe('Negative Cases', () => {
    test('should throw error for invalid cube side length', () => {
      const point = new Point3D(0, 0, 0);
      expect(() => factory.createShape('cube2', [point], -1)).toThrow(InvalidDataException);
    });
  });
});
