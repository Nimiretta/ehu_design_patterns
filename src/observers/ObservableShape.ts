import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';
import type { IObservableShape, IShapeObserver } from './observers.types';

export abstract class ObservableShape implements IObservableShape {
  private observers: IShapeObserver[] = [];

  attach(observer: IShapeObserver): void {
    this.observers.push(observer);
  }

  detach(observer: IShapeObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(shape: Shape2D | Shape3D): void {
    this.observers.forEach((observer) => observer.update(shape));
  }
}
