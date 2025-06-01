import type { OrderComposite, OrderItem, FullOrder } from '../components';
import type { IOrderVisitor } from '.';

type OrderItemPredicate = (item: OrderItem) => boolean;

export class FilteringVisitor implements IOrderVisitor {
  constructor(
    private predicate: OrderItemPredicate,
    private description = 'custom filter',
  ) {}

  visitOrderComposite(order: OrderComposite): void {
    console.log(`Filtering items in composite: "${order.name}" by ${this.description}`);
    order.orderItems.forEach((item) => item.accept(this));
  }

  visitOrderItem(item: OrderItem): void {
    if (this.predicate(item)) {
      console.log(`  - ${item.name}: $${item.price}`);
    }
  }

  visitFullOrder(order: FullOrder): void {
    console.log(`Filtering full order: ${order.name} by ${this.description}`);
    order.items.forEach((item) => item.accept(this));
  }
}
