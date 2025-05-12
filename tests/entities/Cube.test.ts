import { Cube } from '../../src/entities/Cube';
import { Point3D } from '../../src/entities/Point3D';
import { InvalidDataException } from '../../src/exceptions/CustomExceptions';

describe('Cube', () => {
  describe('Positive Cases', () => {
    test('should calculate volume correctly', () => {
      const point = new Point3D(0, 0, 0);
      const cube = new Cube('cube1', [point], 3);
      expect(cube.getVolume()).toBe(27);
    });

    test('should calculate surface area correctly', () => {
      const point = new Point3D(0, 0, 0);
      const cube = new Cube('cube2', [point], 4);
      expect(cube.getSurfaceArea()).toBe(96);
    });

    test('should calculate slice volume by plane correctly', () => {
      const point = new Point3D(0, 0, 1);
      const cube = new Cube('cube3', [point], 3);
      expect(cube.getSliceVolumeByPlane('XY')).toEqual({ part1: 9, part2: 18 });
    });

    test('should identify base on coordinate plane', () => {
      const point = new Point3D(0, 1, 1);
      const cube = new Cube('cube4', [point], 2);
      expect(cube.isBaseOnCoordinatePlane()).toBe(true);
    });
  });

  describe('Negative Cases', () => {
    test('should throw error for unsupported plane', () => {
      const point = new Point3D(0, 0, 0);
      const cube = new Cube('cube5', [point], 3);
      expect(() => cube.getSliceVolumeByPlane('AB' as 'XY')).toThrow(InvalidDataException);
      expect(() => cube.getSliceVolumeByPlane('AB' as 'XY')).toThrow('Unsupported plane');
    });

    test('should return null for slice volume when height is out of bounds', () => {
      const point = new Point3D(0, 0, 4);
      const cube = new Cube('cube6', [point], 3);
      expect(cube.getSliceVolumeByPlane('XY')).toBeNull();
    });

    test('should not identify base on coordinate plane when not aligned', () => {
      const point = new Point3D(1, 1, 1);
      const cube = new Cube('cube7', [point], 2);
      expect(cube.isBaseOnCoordinatePlane()).toBe(false);
    });
  });

  describe('Edge Cases for getSliceVolumeByPlane', () => {
    test('should return null when height is exactly 0', () => {
      const point = new Point3D(0, 0, 0);
      const cube = new Cube('cube8', [point], 3);
      expect(cube.getSliceVolumeByPlane('XY')).toBeNull();
    });

    test('should return null when height is exactly equal to side length', () => {
      const point = new Point3D(0, 0, 3);
      const cube = new Cube('cube9', [point], 3);
      expect(cube.getSliceVolumeByPlane('XY')).toBeNull();
    });

    test('should calculate slice volume by XZ plane correctly', () => {
      const point = new Point3D(0, 1, 0);
      const cube = new Cube('cube10', [point], 3);
      expect(cube.getSliceVolumeByPlane('XZ')).toEqual({ part1: 9, part2: 18 });
    });

    test('should calculate slice volume by YZ plane correctly', () => {
      const point = new Point3D(1, 0, 0);
      const cube = new Cube('cube11', [point], 3);
      expect(cube.getSliceVolumeByPlane('YZ')).toEqual({ part1: 9, part2: 18 });
    });
  });
});
