import type { OfflinePaymentMethod, OfflineItem, OfflineOrder } from '../mocks';
import type { IOrderAdapter } from './IOrderAdapter';
import type { IOrderData, IOrderDataItem } from './orders.types';
import { PAYMENT_METHODS } from '../strategies';

export class OfflineOrderAdapter implements IOrderAdapter {
  normalize(raw: OfflineOrder): IOrderData {
    return {
      items: raw.productLines.map((item) => this.normalizeItem(item)),
      paymentMethod: this.getPaymentMethod(raw.pay_method),
    };
  }

  private normalizeItem(item: OfflineItem): IOrderDataItem {
    if (item.innerItems) {
      return {
        name: item.productName,
        subItems: item.innerItems.map((el) => this.normalizeItem(el)),
      };
    }

    return {
      name: item.productName,
      price: item.productPrice,
    };
  }

  private getPaymentMethod(pay_method: OfflinePaymentMethod): PAYMENT_METHODS {
    switch (pay_method) {
      case 'immediately':
        return PAYMENT_METHODS.PAY_NOW;
      case 'onPickUp':
        return PAYMENT_METHODS.PAY_ON_DELIVERY;
      case 'later':
        return PAYMENT_METHODS.INSTALLMENTS;
      default:
        throw new Error(`Unknown payment method: ${pay_method}`);
    }
  }
}
