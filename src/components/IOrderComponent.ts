import type { IOrderVisitor } from '../visitors';

export interface IOrderComponent {
  accept(visitor: IOrderVisitor): void;
  getPrice(): number;
}
