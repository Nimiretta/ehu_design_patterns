import { Point } from './Point';

export class Point3D extends Point {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {
    super(x, y);
  }
}
