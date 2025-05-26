import { CubeValidator } from '../../src/validators/CubeValidator';
import { Cube } from '../../src/entities/Cube';
import { InvalidDataException } from '../../src/exceptions/CustomExceptions';
import type { Point3D } from '../../src/entities/Point3D';
import { Shape3D } from '../../src/entities/Shape3D';

describe('CubeValidator', () => {
  describe('validate', () => {
    describe('Positive Cases', () => {
      it('should not throw an error for valid points and side length', () => {
        const points: Point3D[] = [{ x: 0, y: 0, z: 0 }];
        const sideLength = 5;

        expect(() => CubeValidator.validate(points, sideLength)).not.toThrow();
      });
    });

    describe('Negative Cases', () => {
      it('should throw an error if side length is zero or negative', () => {
        const points: Point3D[] = [{ x: 0, y: 0, z: 0 }];

        expect(() => CubeValidator.validate(points, 0)).toThrow(InvalidDataException);
        expect(() => CubeValidator.validate(points, -1)).toThrow(InvalidDataException);
      });

      it('should throw an error if points array does not have exactly one point', () => {
        const invalidPoints1: Point3D[] = [];
        const invalidPoints2: Point3D[] = [
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1 },
        ];
        const sideLength = 5;

        expect(() => CubeValidator.validate(invalidPoints1, sideLength)).toThrow(InvalidDataException);
        expect(() => CubeValidator.validate(invalidPoints2, sideLength)).toThrow(InvalidDataException);
      });
    });
  });

  describe('isCube', () => {
    describe('Positive Cases', () => {
      it('should return true if the shape is an instance of Cube', () => {
        const cube = new Cube('cube1', [{ x: 0, y: 0, z: 0 }], 5);

        expect(CubeValidator.isCube(cube)).toBe(true);
      });
    });

    describe('Negative Cases', () => {
      it('should return false if the shape is not an instance of Cube', () => {
        class DummyShape3D extends Shape3D {
          constructor() {
            super('shape1', []);
          }

          getVolume(): number {
            return 0;
          }

          getSurfaceArea(): number {
            return 0;
          }
        }
        const nonCube: Shape3D = new DummyShape3D();

        expect(CubeValidator.isCube(nonCube)).toBe(false);
      });
    });
  });
});
