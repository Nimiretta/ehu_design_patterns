import { Point2D } from '../entities/Point2D';
import { Quadrilateral } from '../entities/Quadrilateral';
import { QuadrilateralValidator } from '../validators/QuadrilateralValidator';
import { ShapeFactory } from './ShapeFactory';

export class QuadrilateralFactory extends ShapeFactory<Point2D, Quadrilateral> {
  createPoint(coords: number[]): Point2D {
    const [x, y] = coords;
    return new Point2D(x, y);
  }

  createShape(id: string, points: Point2D[]): Quadrilateral {
    QuadrilateralValidator.validate(points);
    const quad = new Quadrilateral(id, points);
    this.observeAndNotify(quad);
    return quad;
  }
}
