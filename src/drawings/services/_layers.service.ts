import { Injectable } from '@nestjs/common';

@Injectable()
export class LayersService {
  // constructor(
  //   @InjectModel(DrawingDocument.name)
  //   private drawingModel: Model<DrawingDocument>,
  //   @InjectModel(Layer.name)
  //   private layerModel: Model<Layer>,
  // ) {}
  // toLayerObjectType(layer: Layer): LayerObjectType {
  //   try {
  //     return {
  //       name: layer.name,
  //     };
  //   } catch (err) {
  //     return null;
  //   }
  // }
  // async add(args: NewLayerInput): Promise<Layer> {
  //   // const drawing = await this.drawingModel.findOne({ name: args.drawing });
  //   const newLayer = new this.layerModel({ name: args.name });
  //   await this.drawingModel.findOneAndUpdate(
  //     { name: args.drawing },
  //     { $push: { layers: newLayer.name }, useFindAndModify: false },
  //   );
  //   await newLayer.save();
  //   return newLayer;
  // }
}
