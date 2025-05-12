import { Cube } from '../entities/Cube';
import type { Point3D } from '../entities/Point3D';
import type { Shape3D } from '../entities/Shape3D';
import { InvalidDataException } from '../exceptions/CustomExceptions';

export class CubeValidator {
  static validate(points: Point3D[], sideLength: number) {
    if (sideLength <= 0) {
      throw new InvalidDataException('The side length must be a positive number.');
    }
    if (points.length !== 1) {
      throw new InvalidDataException('Cube must have exactly one point.');
    }
  }

  static isCube(shape: Shape3D): boolean {
    return shape instanceof Cube;
  }
}
