import type { IPreviewObserver } from './IPreviewObserver.js';
import type { FieldComposite } from '../componentsModels/FieldComposite.js';
import { updatePreview } from '../../ui/render.js';
import { ISubject } from './IObserver.js';

export class PreviewObserver implements IPreviewObserver {
  constructor(private root: FieldComposite) {}
  update(subject: ISubject) {
    updatePreview(this.root);
  }
}
