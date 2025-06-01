import type { IOrderVisitor } from './IOrderVisitor';
import type { OrderComposite, OrderItem, FullOrder } from '../components';

export class PrintVisitor implements IOrderVisitor {
  private indentLevel = 0;

  private printIndented(message: string): void {
    console.log(`${'  '.repeat(this.indentLevel)}${message}`);
  }

  visitOrderComposite(order: OrderComposite): void {
    this.printIndented(`Composite: ${order.name} Total Price: $${order.getPrice()}`);
    this.indentLevel++;
    order.orderItems.forEach((item) => item.accept(this));
    this.indentLevel--;
  }

  visitOrderItem(item: OrderItem): void {
    this.printIndented(`Item: ${item.name}, Price: $${item.getPrice()}`);
  }

  visitFullOrder(order: FullOrder): void {
    console.log(`Order: ${order.name} Total Price: $${order.getPrice()} (Channel: ${order.channel})`);
    console.log(`Payment Method: ${order.paymentMethod.constructor.name}`);
    this.indentLevel++;
    order.items.forEach((item) => item.accept(this));
    this.indentLevel--;
  }
}
