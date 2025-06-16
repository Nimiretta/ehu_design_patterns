import type { StringCriteria, IGenStrategy } from './GenStrategy.js';

export class RandomStringStrategy implements IGenStrategy<string> {
  generate(name: string, criteria?: StringCriteria): string {
    const length = Number(criteria?.length) || 5;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * chars.length)];
    return str;
  }
}
