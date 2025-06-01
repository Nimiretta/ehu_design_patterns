import type { IPaymentStrategy } from './IPaymentStrategy';

export class PayNowStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Strategy: Pay now: $${amount}`);
  }
}
