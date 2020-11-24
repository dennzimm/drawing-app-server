import { Injectable } from '@nestjs/common';
import {
  Drawing,
  DrawingCreateInput,
  DrawingOrderByInput,
  DrawingUpdateInput,
  DrawingWhereInput,
  DrawingWhereUniqueInput,
} from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * This DrawingService provides CRUD methods for Drawings.
 * By using the PrismaService it is possible to communicate with the database.
 * The business logic of the DrawingResolver is outsourced to this service class.
 *
 * @export
 * @class DrawingService
 */
@Injectable()
export class DrawingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find zero or one Drawing.
   *
   * @param {DrawingWhereUniqueInput} drawingWhereUniqueInput
   * @return {*}  {(Promise<Drawing | null>)}
   * @memberof DrawingService
   */
  async drawing(
    drawingWhereUniqueInput: DrawingWhereUniqueInput,
  ): Promise<Drawing | null> {
    return this.prisma.drawing.findOne({
      include: { items: true },
      where: drawingWhereUniqueInput,
    });
  }

  /**
   * Find zero or more Drawings.
   *
   * @param {{
   *       skip?: number;
   *       take?: number;
   *       cursor?: DrawingWhereUniqueInput;
   *       where?: DrawingWhereInput;
   *       orderBy?: DrawingOrderByInput;
   *     }} [params={}]
   * @return {*}  {Promise<Drawing[]>}
   * @memberof DrawingService
   */
  async drawings(
    params: {
      skip?: number;
      take?: number;
      cursor?: DrawingWhereUniqueInput;
      where?: DrawingWhereInput;
      orderBy?: DrawingOrderByInput;
    } = {},
  ): Promise<Drawing[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.drawing.findMany({
      include: { items: true },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Create a Drawing.
   *
   * @param {DrawingCreateInput} data
   * @return {*}  {Promise<Drawing>}
   * @memberof DrawingService
   */
  async createDrawing(data: DrawingCreateInput): Promise<Drawing> {
    return this.prisma.drawing.create({
      data,
    });
  }

  /**
   * Update one Drawing.
   *
   * @param {{
   *     where: DrawingWhereUniqueInput;
   *     data: DrawingUpdateInput;
   *   }} params
   * @return {*}  {Promise<Drawing>}
   * @memberof DrawingService
   */
  async updateDrawing(params: {
    where: DrawingWhereUniqueInput;
    data: DrawingUpdateInput;
  }): Promise<Drawing> {
    const { where, data } = params;
    return this.prisma.drawing.update({
      data,
      where,
    });
  }

  /**
   * Delete one Drawing.
   *
   * @param {DrawingWhereUniqueInput} where
   * @return {*}  {Promise<Drawing>}
   * @memberof DrawingService
   */
  async deleteDrawing(where: DrawingWhereUniqueInput): Promise<Drawing> {
    return this.prisma.drawing.delete({
      where,
    });
  }
}
