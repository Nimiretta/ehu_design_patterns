import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';
import type { IComparator } from './comparator.types';

export class IdComparator implements IComparator<Shape2D | Shape3D> {
  compare(a: Shape2D | Shape3D, b: Shape2D | Shape3D): number {
    return a.id.localeCompare(b.id);
  }
}
