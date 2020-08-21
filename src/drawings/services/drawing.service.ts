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

@Injectable()
export class DrawingService {
  constructor(private readonly prisma: PrismaService) {}

  async drawing(
    drawingWhereUniqueInput: DrawingWhereUniqueInput,
  ): Promise<Drawing | null> {
    return this.prisma.drawing.findOne({
      include: { items: true },
      where: drawingWhereUniqueInput,
    });
  }

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

  async createDrawing(data: DrawingCreateInput): Promise<Drawing> {
    return this.prisma.drawing.create({
      data,
    });
  }

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

  async deleteDrawing(where: DrawingWhereUniqueInput): Promise<Drawing> {
    return this.prisma.drawing.delete({
      where,
    });
  }
}
