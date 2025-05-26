export type IShape2DInfo = {
  area: number;
  perimeter: number;
};

export type IShape3DInfo = {
  volume: number;
  surfaceArea: number;
};

export type IWarehouseInfo = IShape2DInfo | IShape3DInfo;
