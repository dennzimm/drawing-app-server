import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import Drawing from '../entities/drawing.entity';
import Item from '../entities/item.entity';
import { CreateDrawingProps } from '../interfaces/drawing.types';
import { DrawingObjectType } from '../models/drawing.model';
import { ItemObjectType } from '../models/item.model';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectRepository(Drawing)
    private drawingsRepository: Repository<Drawing>,
  ) {}

  async findAll(): Promise<DrawingObjectType[]> {
    return from(this.drawingsRepository.find())
      .pipe(map((drawing) => drawing.map(this.drawingReducer)))
      .toPromise();
  }

  async findById(id: string): Promise<DrawingObjectType> {
    const drawing = await this.drawingsRepository.findOne({ id });

    if (!drawing) {
      throw new NotFoundException(id);
    }

    return this.drawingReducer(drawing);
  }

  async create(props: CreateDrawingProps): Promise<DrawingObjectType> {
    const { drawingData } = props;
    const newDrawing = await this.drawingsRepository.create(drawingData);

    return from(this.drawingsRepository.save(newDrawing))
      .pipe(map((drawing) => this.drawingReducer(drawing)))
      .toPromise();
  }

  async createOrFind(props: CreateDrawingProps): Promise<DrawingObjectType> {
    const {
      drawingData: { id },
    } = props;

    return this.create(props).catch((err) => this.findById(id));
  }

  private drawingReducer(drawing: Drawing): DrawingObjectType {
    let items: ItemObjectType[] = [];

    items = drawing.items.map((item: Item) => {
      return {
        drawingID: drawing.id,
        id: item.id,
        data: item.data,
      };
    });

    return {
      id: drawing.id,
      items,
    };
  }
}
