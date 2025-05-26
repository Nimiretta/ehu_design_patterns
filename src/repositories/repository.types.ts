import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';

export interface IShapeRepository {
  add(shape: Shape2D | Shape3D): void;
  remove(id: string): void;
  getById(id: string): Shape2D | Shape3D | undefined;
  getAll(): Array<Shape2D | Shape3D>;
  clear(): void;
}
