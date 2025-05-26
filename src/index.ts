/* eslint-disable indent */
import { QuadrilateralFactory } from './factories/QuadrilateralFactory';
import { CubeFactory } from './factories/CubeFactory';
import type { LineData } from './utils/fileParser';
import { FileParser } from './utils/fileParser';
import { PointValidator } from './validators/PointValidator';
import { logger } from './utils/logger';
import { ShapeRepository } from './repositories/shapeRepository';
import { IdComparator } from './comparators/idComparator';
import { XPointComparator } from './comparators/xPointComparator';
import { YPointComparator } from './comparators/yPointComparator';
import { prettifyOutput } from './utils/outputPrettifier';
import { Warehouse } from './warehouse/Warehouse';
import type { Cube } from './entities/Cube';
import type { Quadrilateral } from './entities/Quadrilateral';

const lines: LineData[] = FileParser.parseFile('./data/input.txt');
const QUAD_FACTORY = new QuadrilateralFactory();
const CUBE_FACTORY = new CubeFactory();
const SHAPE_REPO = ShapeRepository.getInstance();
const WAREHOUSE = Warehouse.getInstance();

lines.forEach(({ type, id, tokens }) => {
  try {
    switch (type) {
      case 'Quad':
        const nums = PointValidator.parseCoords(tokens, 8);
        const coords = Array.from({ length: 4 }, (_, i) => nums.slice(i * 2, i * 2 + 2));
        const points = coords.map((coord) => QUAD_FACTORY.createPoint(coord));
        const quad = QUAD_FACTORY.createShape(id, points);
        SHAPE_REPO.add(quad);
        break;
      case 'Cube':
        const [ox, oy, oz, side] = PointValidator.parseCoords(tokens, 4);
        const origin = CUBE_FACTORY.createPoint([ox, oy, oz]);
        const cube = CUBE_FACTORY.createShape(id, [origin], side);
        SHAPE_REPO.add(cube);
        break;
      default:
        logger.warn(`Unknown shape type: ${type}`);
    }
  } catch (e: any) {
    logger.error(`Skipped ${type} ${id}: ${e.message}`);
  }
});

console.log('========Repo Methods========');
console.log(`In first quadrant:\n${prettifyOutput(SHAPE_REPO.getShapesInFirstQuadrant())}`);
console.log(`2D Shapes:\n${prettifyOutput(SHAPE_REPO.get2DShapes())}`);
console.log(`3D Shapes:\n${prettifyOutput(SHAPE_REPO.get3DShapes())}`);
console.log(`With area 3-4:\n${prettifyOutput(SHAPE_REPO.getByAreaRange(3, 4))}`);
console.log(`With volume 7-9:\n${prettifyOutput(SHAPE_REPO.getByVolumeRange(7, 9))}`);
console.log(`With perimeter 8:\n${prettifyOutput(SHAPE_REPO.getByPerimeterRange(8, 8))}`);
console.log(`With surface area 5-8:\n${prettifyOutput(SHAPE_REPO.getBySurfaceAreaRange(5, 8))}`);
console.log(`Shape with ID 'sq1':\n${JSON.stringify(SHAPE_REPO.getById('sq1'))}`);
SHAPE_REPO.remove('sq1');
console.log(`Repo_state after removing 'sq1':\n${prettifyOutput(SHAPE_REPO.getAll())}`);

console.log('========Comparators========');
const idComparator = new IdComparator();
const xComparator = new XPointComparator();
const yComparator = new YPointComparator();
console.log(`Shapes sorted by ID:\n${prettifyOutput(SHAPE_REPO.getSorted(idComparator))}`);
console.log(`Shapes sorted by X:\n${prettifyOutput(SHAPE_REPO.getSorted(xComparator))}`);
console.log(`Shapes sorted by Y:\n${prettifyOutput(SHAPE_REPO.getSorted(yComparator))}`);

console.log('========Warehouse========');
console.log(`Warehouse state:\n${prettifyOutput(WAREHOUSE.getAll())}`);

(SHAPE_REPO.getById('cube1') as Cube)!.setSideLength(4);
console.log(`Updated cube1:\n${JSON.stringify(WAREHOUSE.getById('cube1'))}`);

(SHAPE_REPO.getById('quad1') as Quadrilateral)!.setPoints(
  [
    QUAD_FACTORY.createPoint([1, 1]),
    QUAD_FACTORY.createPoint([2, 1]),
    QUAD_FACTORY.createPoint([2, 2]),
    QUAD_FACTORY.createPoint([1, 2]),
  ]);
console.log(`Updated quad1:\n${JSON.stringify(WAREHOUSE.getById('quad1'))}`);
