import type { IOrderData, OrderType } from '.';

export interface IOrderAdapter {
  normalize(raw: OrderType): IOrderData;
}
