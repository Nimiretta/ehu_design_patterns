import { QuadrilateralValidator } from '../validators/QuadrilateralValidator';
import type { Point2D } from './Point2D';
import { Shape2D } from './Shape2D';

export class Quadrilateral extends Shape2D {
  constructor(
    public readonly id: string,
    protected points: Point2D[],
  ) {
    super(id, points);
  }

  setPoints(points: Point2D[]): void {
    QuadrilateralValidator.validate(points);
    this.points = points;
    this.notify(this);
  }

  getArea(): number {
    const pts = this.points;
    let sum = 0;
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      sum += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
    }
    return Math.abs(sum) / 2;
  }

  getPerimeter(): number {
    const dist = (a: Point2D, b: Point2D) => Math.hypot(a.x - b.x, a.y - b.y);
    let per = 0;
    for (let i = 0; i < this.points.length; i++) {
      per += dist(this.points[i], this.points[(i + 1) % this.points.length]);
    }
    return per;
  }

  isConvex(): boolean {
    const sign = (p: Point2D, q: Point2D, r: Point2D) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    const signs = this.points.map((_, i) => {
      const a = this.points[i];
      const b = this.points[(i + 1) % 4];
      const c = this.points[(i + 2) % 4];
      return sign(a, b, c);
    });
    return signs.every((s) => s >= 0) || signs.every((s) => s <= 0);
  }

  isSquare(): boolean {
    const dists = this.points.map((p, i) => {
      const nextPoint = this.points[(i + 1) % 4];
      return Math.hypot(p.x - nextPoint.x, p.y - nextPoint.y);
    });
    return dists.every((d) => Math.abs(d - dists[0]) < 1e-6) && this.isConvex();
  }

  isRhombus(): boolean {
    const dists = this.points.map((p, i) => {
      const nextPoint = this.points[(i + 1) % 4];
      return Math.hypot(p.x - nextPoint.x, p.y - nextPoint.y);
    });
    return dists.every((d) => Math.abs(d - dists[0]) < 1e-6);
  }

  isTrapezoid(): boolean {
    const slopes = this.points.map((p, i) => this.slope(p, this.points[(i + 1) % 4]));

    const isFirstPairParallel = this.compareSlopes(slopes[0], slopes[2]);
    const isSecondPairParallel = this.compareSlopes(slopes[1], slopes[3]);

    return (isFirstPairParallel && !isSecondPairParallel) || (!isFirstPairParallel && isSecondPairParallel);
  }

  private slope(p1: Point2D, p2: Point2D): number | undefined {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    if (dx === 0) return undefined;
    return dy / dx;
  }

  private compareSlopes(s1: number | undefined, s2: number | undefined): boolean {
    if (s1 === undefined && s2 === undefined) return true;
    if (s1 === undefined || s2 === undefined) return false;
    return s1 === s2;
  }
}
