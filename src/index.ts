/* eslint-disable indent */
import { QuadrilateralFactory } from './factories/QuadrilateralFactory';
import { CubeFactory } from './factories/CubeFactory';
import type { LineData } from './utils/fileParser';
import { FileParser } from './utils/fileParser';
import { PointValidator } from './validators/PointValidator';
import { logger } from './utils/logger';

const lines: LineData[] = FileParser.parseFile('./data/input.txt');
const QUAD_FACTORY = new QuadrilateralFactory();
const CUBE_FACTORY = new CubeFactory();

lines.forEach(({ type, id, tokens }) => {
  try {
    switch (type) {
      case 'Quad':
        const nums = PointValidator.parseCoords(tokens, 8);
        const coords = Array.from({ length: 4 }, (_, i) => nums.slice(i * 2, i * 2 + 2));
        const points = coords.map((coord) => QUAD_FACTORY.createPoint(coord));
        const quad = QUAD_FACTORY.createShape(id, points);
        logger.info(
          `Quadrilateral ${quad.id}: Area=${quad.getArea()}, Perimeter=${quad.getPerimeter()}, `
            + `IsConvex=${quad.isConvex()}, IsSquare=${quad.isSquare()}, `
            + `IsRhombus=${quad.isRhombus()}, IsTrapezoid=${quad.isTrapezoid()}`,
        );
        break;
      case 'Cube':
        const [ox, oy, oz, side] = PointValidator.parseCoords(tokens, 4);
        const origin = CUBE_FACTORY.createPoint([ox, oy, oz]);
        const cube = CUBE_FACTORY.createShape(id, [origin], side);
        logger.info(
          `Cube ${cube.id}: Volume=${cube.getVolume()}, SurfaceArea=${cube.getSurfaceArea()}, `
            + `IsBaseOnCoordinatePlane=${cube.isBaseOnCoordinatePlane()}, `
            + `SliceVolumeRatioXY=${JSON.stringify(cube.getSliceVolumeByPlane('XY'))}, `
            + `SliceVolumeRatioYZ=${JSON.stringify(cube.getSliceVolumeByPlane('YZ'))}, `
            + `SliceVolumeRatioXZ=${JSON.stringify(cube.getSliceVolumeByPlane('XZ'))}`,
        );
        break;
      default:
        logger.warn(`Unknown shape type: ${type}`);
    }
  } catch (e: any) {
    logger.error(`Skipped ${type} ${id}: ${e.message}`);
  }
});
