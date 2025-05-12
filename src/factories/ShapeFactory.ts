import type { Point } from '../entities/Point';
import type { Shape } from '../entities/Shape';

export abstract class ShapeFactory<P extends Point, S extends Shape> {
  abstract createPoint(coords: number[]): P;
  abstract createShape(id: string, points: P[], ...args: unknown[]): S;
}
