import { ISubject } from './IObserver.js';

export interface IPreviewObserver {
  update(subject: ISubject): void;
}
