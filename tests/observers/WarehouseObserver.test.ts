import { Warehouse } from '../../src/warehouse/Warehouse';
import { WarehouseObserver } from '../../src/observers/WarehouseObserver';
import { Quadrilateral } from '../../src/entities/Quadrilateral';
import { Cube } from '../../src/entities/Cube';
import { Point2D } from '../../src/entities/Point2D';
import { Point3D } from '../../src/entities/Point3D';
import type { IShape2DInfo, IShape3DInfo } from '../../src/warehouse/warehouse.types';

describe('WarehouseObserver', () => {
  let warehouse: Warehouse;
  let observer: WarehouseObserver;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    observer = new WarehouseObserver();
    warehouse.remove('quad1');
    warehouse.remove('cube1');
  });

  it('should update Warehouse for 2D shape', () => {
    const quad = new Quadrilateral('quad1', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]);
    observer.update(quad);
    const info = warehouse.getById('quad1');
    expect(info).toBeDefined();
    expect((info as IShape2DInfo).area).toBeCloseTo(4);
    expect((info as IShape2DInfo).perimeter).toBeCloseTo(8);
  });

  it('should update Warehouse for 3D shape', () => {
    const cube = new Cube('cube1', [new Point3D(0, 0, 0)], 2);
    observer.update(cube);
    const info = warehouse.getById('cube1');
    expect(info).toBeDefined();
    expect((info as IShape3DInfo).volume).toBeCloseTo(8);
    expect((info as IShape3DInfo).surfaceArea).toBeCloseTo(24);
  });
});
