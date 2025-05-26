import { Shape2D } from '../../src/entities/Shape2D';
import { Point2D } from '../../src/entities/Point2D';

describe('Shape2D', () => {
  class TestShape2D extends Shape2D {
    getArea() {
      return 0;
    }

    getPerimeter() {
      return 0;
    }
  }

  test('should create instance with correct id and points', () => {
    const points = [new Point2D(0, 0), new Point2D(1, 0), new Point2D(1, 1), new Point2D(0, 1)];
    const shape = new TestShape2D('testShape', points);
    expect(shape.id).toBe('testShape');
    expect(shape.getPoints()).toEqual(points);
  });
});
