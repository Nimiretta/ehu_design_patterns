import type { Shape2D } from '../../src/entities/Shape2D';
import { Point2D } from '../../src/entities/Point2D';

describe('Shape2D', () => {
  test('should create instance with correct id and points', () => {
    const points = [new Point2D(0, 0), new Point2D(1, 0), new Point2D(1, 1), new Point2D(0, 1)];
    const shape = { id: 'testShape', points } as Shape2D;

    expect(shape.id).toBe('testShape');
    expect(shape.points).toEqual(points);
  });

  test('should be abstract and require implementation of getArea and getPerimeter', () => {
    const points = [new Point2D(0, 0), new Point2D(1, 0)];
    const shape = { id: 'invalidShape', points } as Shape2D;

    expect(shape.id).toBe('invalidShape');
    expect(shape.points).toEqual(points);
  });
});
