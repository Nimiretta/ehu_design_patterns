/* eslint-disable max-classes-per-file */
import { ObservableShape } from '../../src/observers/ObservableShape';
import type { IShapeObserver } from '../../src/observers/observers.types';
import type { Shape2D } from '../../src/entities/Shape2D';
import type { Shape3D } from '../../src/entities/Shape3D';

describe('ObservableShape', () => {
  class DummyShape extends ObservableShape {
    constructor(public id: string) {
      super();
    }

    getArea() {
      return 0;
    }

    getPerimeter() {
      return 0;
    }
  }

  class DummyObserver implements IShapeObserver {
    public updatedWith: (Shape2D | Shape3D)[] = [];

    update(shape: Shape2D | Shape3D): void {
      this.updatedWith.push(shape);
    }
  }

  it('attaches and notifies observers', () => {
    const shape = new DummyShape('1');
    const observer = new DummyObserver();
    shape.attach(observer);
    shape.notify(shape as Shape2D | Shape3D);
    expect(observer.updatedWith).toContain(shape);
  });

  it('detaches observers', () => {
    const shape = new DummyShape('2');
    const observer = new DummyObserver();
    shape.attach(observer);
    shape.detach(observer);
    shape.notify(shape as Shape2D | Shape3D);
    expect(observer.updatedWith).toHaveLength(0);
  });

  it('notifies multiple observers', () => {
    const shape = new DummyShape('3');
    const observer1 = new DummyObserver();
    const observer2 = new DummyObserver();
    shape.attach(observer1);
    shape.attach(observer2);
    shape.notify(shape as Shape2D | Shape3D);
    expect(observer1.updatedWith).toContain(shape);
    expect(observer2.updatedWith).toContain(shape);
  });

  it('handles multiple attach/detach cycles', () => {
    const shape = new DummyShape('4');
    const observer = new DummyObserver();
    shape.attach(observer);
    shape.detach(observer);
    shape.attach(observer);
    shape.notify(shape as Shape2D | Shape3D);
    expect(observer.updatedWith).toContain(shape);
  });
});
