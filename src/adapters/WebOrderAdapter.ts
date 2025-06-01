import type { WebPaymentMethod, WebItem, WebOrder } from '../mocks';
import { PAYMENT_METHODS } from '../strategies';
import type { IOrderAdapter } from './IOrderAdapter';
import type { IOrderData, IOrderDataItem } from './orders.types';

export class WebOrderAdapter implements IOrderAdapter {
  normalize(raw: WebOrder): IOrderData {
    return {
      items: raw.webItems.map((item) => this.normalizeItem(item)),
      paymentMethod: this.getPaymentMethod(raw.pay_type),
    };
  }

  private normalizeItem(item: WebItem): IOrderDataItem {
    if (item.subItems) {
      return {
        name: item.product,
        subItems: item.subItems.map((subItem) => this.normalizeItem(subItem)),
      };
    }

    return {
      name: item.product,
      price: item.price,
    };
  }

  private getPaymentMethod(pay_type: WebPaymentMethod): PAYMENT_METHODS {
    switch (pay_type) {
      case 'now':
        return PAYMENT_METHODS.PAY_NOW;
      case 'delivery':
        return PAYMENT_METHODS.PAY_ON_DELIVERY;
      case 'installments':
        return PAYMENT_METHODS.INSTALLMENTS;
      default:
        throw new Error(`Unknown payment method: ${pay_type}`);
    }
  }
}
