import { ShapeRepository } from '../../src/repositories/shapeRepository';
import { Quadrilateral } from '../../src/entities/Quadrilateral';
import { Cube } from '../../src/entities/Cube';
import { Point2D } from '../../src/entities/Point2D';
import { Point3D } from '../../src/entities/Point3D';

describe('ShapeRepository', () => {
  let repo: ShapeRepository;

  beforeEach(() => {
    repo = ShapeRepository.getInstance();
    repo.clear();
  });

  it('should add and get shape by id', () => {
    const quad = new Quadrilateral('quad1', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]);
    repo.add(quad);
    expect(repo.getById('quad1')).toBe(quad);
  });

  it('should remove shape by id', () => {
    const quad = new Quadrilateral('quad2', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]);
    repo.add(quad);
    repo.remove('quad2');
    expect(repo.getById('quad2')).toBeUndefined();
  });

  it('should return all shapes', () => {
    const quad = new Quadrilateral('quad3', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]);
    const cube = new Cube('cube1', [new Point3D(0, 0, 0)], 2);
    repo.add(quad);
    repo.add(cube);
    expect(repo.getAll()).toEqual(expect.arrayContaining([quad, cube]));
  });

  it('should clear all shapes', () => {
    const quad = new Quadrilateral('quad4', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]);
    repo.add(quad);
    repo.clear();
    expect(repo.getAll()).toHaveLength(0);
  });

  it('should filter 2D and 3D shapes', () => {
    const quad = new Quadrilateral('quad5', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]);
    const cube = new Cube('cube2', [new Point3D(0, 0, 0)], 2);
    repo.add(quad);
    repo.add(cube);
    expect(repo.get2DShapes()).toEqual([quad]);
    expect(repo.get3DShapes()).toEqual([cube]);
  });

  it('should find shapes in first quadrant', () => {
    const quad = new Quadrilateral('quad6', [
      new Point2D(1, 1),
      new Point2D(2, 1),
      new Point2D(2, 2),
      new Point2D(1, 2),
    ]);
    const quadNeg = new Quadrilateral('quad7', [
      new Point2D(-1, 1),
      new Point2D(2, 1),
      new Point2D(2, 2),
      new Point2D(1, 2),
    ]);
    repo.add(quad);
    repo.add(quadNeg);
    expect(repo.getShapesInFirstQuadrant()).toEqual([quad]);
  });

  it('should sort shapes by id', () => {
    const quadA = new Quadrilateral('a', [new Point2D(0, 0), new Point2D(1, 0), new Point2D(1, 1), new Point2D(0, 1)]);
    const quadB = new Quadrilateral('b', [new Point2D(0, 0), new Point2D(1, 0), new Point2D(1, 1), new Point2D(0, 1)]);
    repo.add(quadB);
    repo.add(quadA);
    const sorted = repo.getAll().sort((a, b) => a.id.localeCompare(b.id));
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
  });

  it('should filter 2D shapes by area range', () => {
    const quad1 = new Quadrilateral('quadA', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]); // area 4
    const quad2 = new Quadrilateral('quadB', [
      new Point2D(0, 0),
      new Point2D(4, 0),
      new Point2D(4, 1),
      new Point2D(0, 1),
    ]); // area 4
    const quad3 = new Quadrilateral('quadC', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]); // area 1
    repo.add(quad1);
    repo.add(quad2);
    repo.add(quad3);
    const result = repo.getByAreaRange(2, 4);
    expect(result).toEqual(expect.arrayContaining([quad1, quad2]));
    expect(result).not.toContain(quad3);
  });

  it('should filter 2D shapes by perimeter range', () => {
    const quad1 = new Quadrilateral('quadA', [
      new Point2D(0, 0),
      new Point2D(2, 0),
      new Point2D(2, 2),
      new Point2D(0, 2),
    ]); // perim 8
    const quad2 = new Quadrilateral('quadB', [
      new Point2D(0, 0),
      new Point2D(4, 0),
      new Point2D(4, 1),
      new Point2D(0, 1),
    ]); // perim 10
    const quad3 = new Quadrilateral('quadC', [
      new Point2D(0, 0),
      new Point2D(1, 0),
      new Point2D(1, 1),
      new Point2D(0, 1),
    ]); // perim 4
    repo.add(quad1);
    repo.add(quad2);
    repo.add(quad3);
    const result = repo.getByPerimeterRange(8, 10);
    expect(result).toEqual(expect.arrayContaining([quad1, quad2]));
    expect(result).not.toContain(quad3);
  });

  it('should filter 3D shapes by volume range', () => {
    const cube1 = new Cube('cubeA', [new Point3D(0, 0, 0)], 2); // vol 8
    const cube2 = new Cube('cubeB', [new Point3D(0, 0, 0)], 3); // vol 27
    const cube3 = new Cube('cubeC', [new Point3D(0, 0, 0)], 1); // vol 1
    repo.add(cube1);
    repo.add(cube2);
    repo.add(cube3);
    const result = repo.getByVolumeRange(5, 20);
    expect(result).toEqual([cube1]);
    expect(result).not.toContain(cube2);
    expect(result).not.toContain(cube3);
  });

  it('should filter 3D shapes by surface area range', () => {
    const cube1 = new Cube('cubeA', [new Point3D(0, 0, 0)], 2); // sa 24
    const cube2 = new Cube('cubeB', [new Point3D(0, 0, 0)], 3); // sa 54
    const cube3 = new Cube('cubeC', [new Point3D(0, 0, 0)], 1); // sa 6
    repo.add(cube1);
    repo.add(cube2);
    repo.add(cube3);
    const result = repo.getBySurfaceAreaRange(10, 30);
    expect(result).toEqual([cube1]);
    expect(result).not.toContain(cube2);
    expect(result).not.toContain(cube3);
  });
});
