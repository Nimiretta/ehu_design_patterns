import type { IObserver, ISubject } from './IObserver.js';

export class PreviewSubject implements ISubject {
  private observers: IObserver[] = [];

  subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this));
  }
}
