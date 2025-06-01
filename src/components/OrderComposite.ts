import type { IOrderComponent } from './IOrderComponent';
import type { IOrderVisitor } from '../visitors';

export class OrderComposite implements IOrderComponent {
  public orderItems: IOrderComponent[] = [];

  constructor(public name: string) {}

  add(item: IOrderComponent): void {
    this.orderItems.push(item);
  }

  getPrice(): number {
    return this.orderItems.reduce((total, item) => total + item.getPrice(), 0);
  }

  accept(visitor: IOrderVisitor): void {
    visitor.visitOrderComposite(this);
  }
}
