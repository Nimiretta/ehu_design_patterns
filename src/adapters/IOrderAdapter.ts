import type { IOrderData, OrderType } from './orders.types';

export interface IOrderAdapter {
  normalize(raw: OrderType): IOrderData;
}
