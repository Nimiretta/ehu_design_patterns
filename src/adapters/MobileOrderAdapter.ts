import type { MobilePaymentMethod, MobileItem, MobileOrder } from '../mocks';
import type { IOrderAdapter, IOrderData, IOrderDataItem } from '.';
import { PAYMENT_METHODS } from '../strategies';

export class MobileOrderAdapter implements IOrderAdapter {
  normalize(raw: MobileOrder): IOrderData {
    return {
      items: raw.itemsList.map((item) => this.normalizeItem(item)),
      paymentMethod: this.getPaymentMethod(raw.payment),
    };
  }

  private normalizeItem(item: MobileItem): IOrderDataItem {
    if (item.dependantItems) {
      return {
        name: item.title,
        subItems: item.dependantItems.map((el) => this.normalizeItem(el)),
      };
    }

    return {
      name: item.title,
      price: item.cost,
    };
  }

  private getPaymentMethod(payment: MobilePaymentMethod): PAYMENT_METHODS {
    switch (payment) {
      case 'onOrder':
        return PAYMENT_METHODS.PAY_NOW;
      case 'onDelivery':
        return PAYMENT_METHODS.PAY_ON_DELIVERY;
      case 'inParts':
        return PAYMENT_METHODS.INSTALLMENTS;
      default:
        throw new Error(`Unknown payment method: ${payment}`);
    }
  }
}
