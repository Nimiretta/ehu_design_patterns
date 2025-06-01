import { randomUUID } from 'crypto';
import type { IOrderAdapter, IOrderDataItem, OrderType } from '../adapters';
import { FullOrder, OrderComposite, OrderItem } from '../components';
import type { IOrderComponent } from '../components';
import { InstallmentStrategy, PAYMENT_METHODS, PayNowStrategy, PayOnDeliveryStrategy } from '../strategies';
import type { IPaymentStrategy } from '../strategies';

export const enum CHANNEL {
  WEB_ORDER = 'web',
  MOBILE_ORDER = 'mobile',
  OFFLINE_ORDER = 'offline',
}

export abstract class OrderCreator {
  abstract channel: CHANNEL;

  readonly PAYMENT_METHODS: Record<PAYMENT_METHODS, IPaymentStrategy> = {
    [PAYMENT_METHODS.INSTALLMENTS]: new InstallmentStrategy(),
    [PAYMENT_METHODS.PAY_NOW]: new PayNowStrategy(),
    [PAYMENT_METHODS.PAY_ON_DELIVERY]: new PayOnDeliveryStrategy(),
  };

  constructor(protected adapter: IOrderAdapter) {}

  public createOrder(data: OrderType): FullOrder {
    const adaptedData = this.adapter.normalize(data);
    const order = new FullOrder(
      `ORD${randomUUID()}-${this.channel}`,
      this.channel,
      this.PAYMENT_METHODS[adaptedData.paymentMethod],
    );
    adaptedData.items.forEach((item) => order.add(this.createItem(item)));
    return order;
  }

  private createItem(item: IOrderDataItem): IOrderComponent {
    if (item.subItems) {
      const compositeItem = new OrderComposite(item.name);
      item.subItems.forEach((subItem) => compositeItem.add(this.createItem(subItem)));
      return compositeItem;
    }
    return new OrderItem(item.name, item.price);
  }
}
