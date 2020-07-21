export enum PaperItemTypes {
  Layer = 'Layer',
  Path = 'Path',
  Shape = 'Shape',
}

export type PaperItemType = keyof typeof PaperItemTypes;

export interface PaperItemOptions {
  name: string;
  applyMatrix?: boolean;
  children: [PaperItemType, PaperItemOptions];
  [key: string]: unknown;
}

export type PaperItemData<T = PaperItemType> = [T, PaperItemOptions];
export type PaperLayerData = PaperItemData<'Layer'>;
export type PaperPathData = PaperItemData<'Path'>;
export type PaperShapeData = PaperItemData<'Shape'>;
