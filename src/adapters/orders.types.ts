import type { MobileOrder, OfflineOrder, WebOrder } from '../mocks';
import type { PAYMENT_METHODS } from '../strategies';

export type IOrderDataItem =
  | {
      name: string;
      price: number;
      subItems?: never;
    }
  | {
      name: string;
      subItems: IOrderDataItem[];
      price?: never;
    };

export interface IOrderData {
  items: IOrderDataItem[];
  paymentMethod: PAYMENT_METHODS;
}

export type OrderType = WebOrder | MobileOrder | OfflineOrder;
