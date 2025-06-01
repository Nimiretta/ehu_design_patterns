export type MobileItem =
  | {
      title: string;
      cost: number;
      dependantItems?: never;
    }
  | {
      title: string;
      dependantItems: MobileItem[];
      cost?: never;
    };

export type MobilePaymentMethod = 'onOrder' | 'onDelivery' | 'inParts';

export class MobileOrder {
  constructor(
    public itemsList: MobileItem[],
    public payment: MobilePaymentMethod,
  ) {}
}
