import type { IPaymentStrategy } from '.';

export class InstallmentStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Strategy: Pay in installments: total $${amount}`);
  }
}
