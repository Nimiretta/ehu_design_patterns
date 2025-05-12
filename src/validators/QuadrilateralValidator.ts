import type { Point2D } from '../entities/Point2D';
import { ValidationError } from '../exceptions/CustomExceptions';

export class QuadrilateralValidator {
  static validate(points: Point2D[]) {
    if (points.length !== 4) throw new ValidationError('A quadrilateral must have exactly 4 points.');
    this.checkUniquePoints(points);
    this.checkCollinearPoints(points);
  }

  private static checkCollinearPoints(points: Point2D[]): void {
    const area = (a: Point2D, b: Point2D, c: Point2D) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    for (let i = 0; i < 4; i++) {
      if (area(points[i], points[(i + 1) % 4], points[(i + 2) % 4]) === 0) {
        throw new ValidationError('Three points of the quadrilateral are collinear.');
      }
    }
  }

  private static checkUniquePoints(points: Point2D[]): void {
    const uniquePoints = new Set(points.map((p) => `${p.x},${p.y}`));
    if (uniquePoints.size !== 4) {
      throw new ValidationError('There are duplicated points');
    }
  }
}
