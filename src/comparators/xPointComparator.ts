import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';
import type { IComparator } from './comparator.types';

export class XPointComparator implements IComparator<Shape2D | Shape3D> {
  compare(a: Shape2D | Shape3D, b: Shape2D | Shape3D): number {
    const ax = a.getPoints()[0].x;
    const bx = b.getPoints()[0].x;
    return ax - bx;
  }
}
