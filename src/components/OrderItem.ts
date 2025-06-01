import type { IOrderVisitor } from '../visitors';
import type { IOrderComponent } from './IOrderComponent';

export class OrderItem implements IOrderComponent {
  constructor(
    public name: string,
    public price: number,
  ) {}

  accept(visitor: IOrderVisitor): void {
    visitor.visitOrderItem(this);
  }

  getPrice(): number {
    return this.price;
  }
}
