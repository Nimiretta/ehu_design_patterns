import { ObservableShape } from '../observers/ObservableShape';

export abstract class Shape extends ObservableShape {
  constructor(public readonly id: string) {
    super();
  }
}
