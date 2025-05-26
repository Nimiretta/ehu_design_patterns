import type { Point } from '../entities/Point';
import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';
import { WarehouseObserver } from '../observers/WarehouseObserver';

export abstract class ShapeFactory<P extends Point, S extends Shape2D | Shape3D> {
  abstract createPoint(coords: number[]): P;
  abstract createShape(id: string, points: P[], ...args: unknown[]): S;
  protected observeAndNotify(shape: S): void {
    shape.attach(new WarehouseObserver());
    shape.notify(shape);
  }
}
