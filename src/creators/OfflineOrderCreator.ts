import { OfflineOrderAdapter } from '../adapters';
import { CHANNEL, OrderCreator } from '.';

export class OfflineOrderCreator extends OrderCreator {
  channel = CHANNEL.OFFLINE_ORDER;

  constructor() {
    super(new OfflineOrderAdapter());
  }
}
