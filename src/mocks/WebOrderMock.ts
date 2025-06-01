export type WebItem =
  | {
      product: string;
      price: number;
      subItems?: never;
    }
  | {
      product: string;
      subItems: WebItem[];
      price?: never;
    };

export type WebPaymentMethod = 'now' | 'delivery' | 'installments';

export class WebOrder {
  constructor(
    public webItems: WebItem[],
    public pay_type: WebPaymentMethod,
  ) {}
}
