import type { OrderComposite, OrderItem, FullOrder } from '../components';

export interface IOrderVisitor {
  visitOrderComposite(orderComposite: OrderComposite): void;
  visitOrderItem(orderItem: OrderItem): void;
  visitFullOrder(fullOrder: FullOrder): void;
}
