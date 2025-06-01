import type { IPaymentStrategy } from './IPaymentStrategy';

export class InstallmentStrategy implements IPaymentStrategy {
  pay(amount: number): void {
    console.log(`Strategy: Pay in installments: total $${amount}`);
  }
}
