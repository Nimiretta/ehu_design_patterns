import type { IPaymentStrategy } from '.';

export class PayOnDeliveryStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Strategy: Pay on delivery: $${amount}`);
  }
}
