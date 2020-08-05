import { FilterArgs } from './with-filters';

interface DrawingFilter {
  drawingID: string;
}

export function drawingFilter<
  P extends Record<string, DrawingFilter>,
  V extends DrawingFilter
>(args: FilterArgs<P, V>): boolean {
  const { payload, variables, key } = args;

  return payload[key].drawingID === variables.drawingID;
}

export function drawingsFilter<
  P extends Record<string, DrawingFilter>,
  V extends DrawingFilter
>(args: FilterArgs<P, V>): boolean {
  const { payload, variables, key } = args;

  return payload[key].drawingID === variables.drawingID;
}
