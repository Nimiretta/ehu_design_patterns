import type { Point3D } from './Point3D';
import { Shape } from './Shape';

export abstract class Shape3D extends Shape {
  constructor(
    public readonly id: string,
    public points: Point3D[],
  ) {
    super(id);
  }
  abstract getVolume(): number;
  abstract getSurfaceArea(): number;
}
