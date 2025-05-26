import type { Point2D } from './Point2D';
import { Shape } from './Shape';

export abstract class Shape2D extends Shape {
  constructor(
    public readonly id: string,
    protected points: Point2D[],
  ) {
    super(id);
  }
  abstract getArea(): number;
  abstract getPerimeter(): number;

  public getPoints(): Point2D[] {
    return this.points;
  }
}
