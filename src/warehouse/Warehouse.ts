import type { Shape2D } from '../entities/Shape2D';
import type { Shape3D } from '../entities/Shape3D';
import type { IWarehouseInfo } from './warehouse.types';

export class Warehouse {
  private static instance: Warehouse;

  private data: Map<string, IWarehouseInfo> = new Map();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  update2D(shape: Shape2D): void {
    this.data.set(shape.id, { area: shape.getArea(), perimeter: shape.getPerimeter() });
  }

  update3D(shape: Shape3D): void {
    this.data.set(shape.id, { volume: shape.getVolume(), surfaceArea: shape.getSurfaceArea() });
  }

  remove(id: string): void {
    this.data.delete(id);
  }

  getById(id: string): IWarehouseInfo | undefined {
    return this.data.get(id);
  }

  getAll(): IWarehouseInfo[] {
    return Array.from(this.data.values());
  }
}
