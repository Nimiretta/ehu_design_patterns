import { MobileOrderAdapter } from '../adapters';
import { CHANNEL, OrderCreator } from './OrderCreator';

export class MobileOrderCreator extends OrderCreator {
  channel = CHANNEL.MOBILE_ORDER;

  constructor() {
    super(new MobileOrderAdapter());
  }
}
