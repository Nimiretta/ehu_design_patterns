import { Shape2D } from '../entities/Shape2D';
import { Shape3D } from '../entities/Shape3D';
import { Warehouse } from '../warehouse/Warehouse';
import type { IShapeObserver } from './observers.types';

export class WarehouseObserver implements IShapeObserver {
  update(shape: Shape2D | Shape3D): void {
    const warehouse = Warehouse.getInstance();
    if (shape instanceof Shape2D) {
      warehouse.update2D(shape);
    }
    if (shape instanceof Shape3D) {
      warehouse.update3D(shape);
    }
  }
}
