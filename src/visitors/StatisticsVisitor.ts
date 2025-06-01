import type { OrderComposite, OrderItem, FullOrder } from '../components';
import type { IOrderVisitor } from '.';

export class StatisticsVisitor implements IOrderVisitor {
  private totalPrice = 0;

  private itemCount = 0;

  visitOrderComposite(order: OrderComposite): void {
    console.log(`Visiting composite order: ${order.name}`);
    order.orderItems.forEach((item) => item.accept(this));
  }

  visitOrderItem(item: OrderItem): void {
    this.totalPrice += item.getPrice();
    this.itemCount++;
  }

  visitFullOrder(order: FullOrder): void {
    console.log(`Visiting full order: ${order.name}`);
    order.items.forEach((item) => item.accept(this));
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  getItemCount(): number {
    return this.itemCount;
  }

  resetTotalPrice(): void {
    this.totalPrice = 0;
  }

  resetItemCount(): void {
    this.itemCount = 0;
  }

  resetAll(): void {
    this.resetTotalPrice();
    this.resetItemCount();
  }
}
