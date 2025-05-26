import { Warehouse } from '../../src/warehouse/Warehouse';
import { Quadrilateral } from '../../src/entities/Quadrilateral';
import { Cube } from '../../src/entities/Cube';
import { Point2D } from '../../src/entities/Point2D';
import { Point3D } from '../../src/entities/Point3D';
import type { IShape2DInfo, IShape3DInfo } from '../../src/warehouse/warehouse.types';

describe('Warehouse', () => {
  let warehouse: Warehouse;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    warehouse.remove('quad1');
    warehouse.remove('cube1');
  });

  it('should update and get area and perimeter for 2D shape', () => {
    const quad = new Quadrilateral('quad1', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]);
    warehouse.update2D(quad);
    const info = warehouse.getById('quad1');
    expect(info).toBeDefined();
    expect((info as IShape2DInfo).area).toBeCloseTo(4);
    expect((info as IShape2DInfo).perimeter).toBeCloseTo(8);
  });

  it('should update and get volume and surface area for 3D shape', () => {
    const cube = new Cube('cube1', [new Point3D(0, 0, 0)], 2);
    warehouse.update3D(cube);
    const info = warehouse.getById('cube1');
    expect(info).toBeDefined();
    expect((info as IShape3DInfo).volume).toBeCloseTo(8);
    expect((info as IShape3DInfo).surfaceArea).toBeCloseTo(24);
  });

  it('should remove all values for a shape', () => {
    const quad = new Quadrilateral('quad1', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]);
    warehouse.update2D(quad);
    warehouse.remove('quad1');
    expect(warehouse.getById('quad1')).toBeUndefined();
  });

  it('should return undefined for unknown id', () => {
    expect(warehouse.getById('unknown')).toBeUndefined();
  });

  it('should get all shape infos', () => {
    const quad = new Quadrilateral('quad2', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]);
    const cube = new Cube('cube2', [new Point3D(0, 0, 0)], 3);
    warehouse.update2D(quad);
    warehouse.update3D(cube);
    const all = warehouse.getAll();
    expect(all).toEqual(
      expect.arrayContaining([
        { area: 4, perimeter: 8 },
        { volume: 27, surfaceArea: 54 },
      ]),
    );
  });
});
