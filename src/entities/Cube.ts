/* eslint-disable indent */
import type { Point3D } from './Point3D';
import { InvalidDataException } from '../exceptions/CustomExceptions';
import { Shape3D } from './Shape3D';

export class Cube extends Shape3D {
  constructor(
    public readonly id: string,
    public readonly points: [Point3D],
    public readonly sideLength: number,
  ) {
    super(id, points);
  }

  getVolume(): number {
    return this.sideLength ** 3;
  }

  getSurfaceArea(): number {
    return 6 * this.sideLength ** 2;
  }

  getSliceVolumeByPlane(plane: 'XY' | 'XZ' | 'YZ'): { part1: number; part2: number } | null {
    let h: number;
    switch (plane) {
      case 'XY':
        h = this.points[0].z;
        break;
      case 'XZ':
        h = this.points[0].y;
        break;
      case 'YZ':
        h = this.points[0].x;
        break;
      default:
        throw new InvalidDataException('Unsupported plane');
    }

    const s = this.sideLength;
    if (h <= 0 || h >= s) {
      return null;
    }

    const area = s * s;
    const vol1 = h * area;
    const vol2 = (s - h) * area;
    return { part1: vol1, part2: vol2 };
  }

  isBaseOnCoordinatePlane(): boolean {
    return this.points[0].x === 0 || this.points[0].y === 0 || this.points[0].z === 0;
  }
}
