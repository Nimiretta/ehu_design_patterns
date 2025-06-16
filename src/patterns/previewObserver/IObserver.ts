export interface IObserver {
  update(subject: ISubject): void;
}

export interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}
