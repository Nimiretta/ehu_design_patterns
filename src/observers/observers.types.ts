import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';

export interface IShapeObserver {
  update(shape: Shape2D | Shape3D): void;
}

export interface IObservableShape {
  attach(observer: IShapeObserver): void;
  detach(observer: IShapeObserver): void;
  notify(shape: Shape2D | Shape3D): void;
}
