import { Cube } from '../entities/Cube';
import { Point3D } from '../entities/Point3D';
import { CubeValidator } from '../validators/CubeValidator';
import { ShapeFactory } from './ShapeFactory';

export class CubeFactory extends ShapeFactory<Point3D, Cube> {
  createPoint(coords: number[]): Point3D {
    const [x, y, z] = coords;
    return new Point3D(x, y, z);
  }

  createShape(id: string, points: [Point3D], sideLength: number): Cube {
    CubeValidator.validate(points, sideLength);
    return new Cube(id, points, sideLength);
  }
}
