import { WebOrderAdapter } from '../adapters';
import { CHANNEL, OrderCreator } from './OrderCreator';

export class WebOrderCreator extends OrderCreator {
  channel = CHANNEL.WEB_ORDER;

  constructor() {
    super(new WebOrderAdapter());
  }
}
