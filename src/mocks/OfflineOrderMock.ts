export type OfflineItem =
  | {
      productName: string;
      productPrice: number;
      innerItems?: never;
    }
  | {
      productName: string;
      innerItems: OfflineItem[];
      productPrice?: never;
    };

export type OfflinePaymentMethod = 'immediately' | 'onPickUp' | 'later';

export class OfflineOrder {
  constructor(
    public productLines: OfflineItem[],
    public pay_method: OfflinePaymentMethod,
  ) {}
}
