/* eslint-disable indent */
import type { Point2D } from '../entities/Point2D';
import type { Point3D } from '../entities/Point3D';
import { Shape2D } from '../entities/Shape2D';
import { Shape3D } from '../entities/Shape3D';
import type { IShapeRepository } from './repository.types';
import type { IComparator } from '../comparators/comparator.types';
import { Warehouse } from '../warehouse/Warehouse';

export class ShapeRepository implements IShapeRepository {
  private static instance: ShapeRepository;

  private shapes: Map<string, Shape2D | Shape3D> = new Map();

  private constructor() {}

  public static getInstance(): ShapeRepository {
    if (!ShapeRepository.instance) {
      ShapeRepository.instance = new ShapeRepository();
    }
    return ShapeRepository.instance;
  }

  add(shape: Shape2D | Shape3D): void {
    this.shapes.set(shape.id, shape);
  }

  remove(id: string): void {
    this.shapes.delete(id);
    Warehouse.getInstance().remove(id);
  }

  getById(id: string): Shape2D | Shape3D | undefined {
    return this.shapes.get(id);
  }

  getAll(): Array<Shape2D | Shape3D> {
    return Array.from(this.shapes.values());
  }

  clear(): void {
    this.shapes.clear();
  }

  getShapesInFirstQuadrant(): Array<Shape2D | Shape3D> {
    return this.getAll().filter((shape: Shape2D | Shape3D) =>
      shape.getPoints().every((point: Point2D | Point3D) => Object.values(point).every((coord: number) => coord > 0)),
    );
  }

  get2DShapes(): Array<Shape2D> {
    return this.getAll().filter((shape: Shape2D | Shape3D) => shape instanceof Shape2D);
  }

  get3DShapes(): Array<Shape3D> {
    return this.getAll().filter((shape: Shape2D | Shape3D) => shape instanceof Shape3D);
  }

  getByAreaRange(min: number, max: number): Array<Shape2D> {
    return this.get2DShapes().filter((shape: Shape2D) => {
      const area = shape.getArea();
      return area >= min && area <= max;
    });
  }

  getByPerimeterRange(min: number, max: number): Array<Shape2D> {
    return this.get2DShapes().filter((shape: Shape2D) => {
      const perimeter = shape.getPerimeter();
      return perimeter >= min && perimeter <= max;
    });
  }

  getByVolumeRange(min: number, max: number): Array<Shape3D> {
    return this.get3DShapes().filter((shape: Shape3D) => {
      const volume = shape.getVolume();
      return volume >= min && volume <= max;
    });
  }

  getBySurfaceAreaRange(min: number, max: number): Array<Shape3D> {
    return this.get3DShapes().filter((shape: Shape3D) => {
      const surfaceArea = shape.getSurfaceArea();
      return surfaceArea >= min && surfaceArea <= max;
    });
  }

  getSorted(comparator: IComparator<Shape2D | Shape3D>): Array<Shape2D | Shape3D> {
    return this.getAll().sort((a, b) => comparator.compare(a, b));
  }
}
