import type { CHANNEL } from '../creators';
import type { IPaymentStrategy } from '../strategies';
import type { IOrderVisitor } from '../visitors';
import type { IOrderComponent } from './IOrderComponent';
import { OrderComposite } from './OrderComposite';

export class FullOrder extends OrderComposite {
  public readonly channel: CHANNEL;

  public readonly paymentMethod: IPaymentStrategy;

  constructor(name: string, channel: CHANNEL, paymentMethod: IPaymentStrategy) {
    super(name);
    this.channel = channel;
    this.paymentMethod = paymentMethod;
  }

  get items(): IOrderComponent[] {
    return this.orderItems;
  }

  accept(visitor: IOrderVisitor): void {
    visitor.visitFullOrder(this);
  }
}
