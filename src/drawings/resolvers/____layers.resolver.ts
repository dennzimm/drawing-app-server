// import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
// import { PubSubEngine } from 'apollo-server-express';
// import { NewLayerInput } from '../dto/layer.dto';
// import { LayerObjectType as Layer } from '../models/layer.model';
// import { LayersService } from '../services/layers.service';

export enum LayersSubscriptionsType {
  LAYER_ADDED = 'layerAdded',
}

@Resolver('Layer')
export class LayersResolver {
  // constructor(
  //   @Inject('PUB_SUB') private pubSub: PubSubEngine,
  //   private layersService: LayersService,
  // ) {}
  // @Mutation(returns => Layer)
  // async addLayer(
  //   @Args('newLayerData') newLayerData: NewLayerInput,
  // ): Promise<Layer> {
  //   const addedLayer = await this.layersService.add(newLayerData);
  //   const layerObject = this.layersService.toLayerObjectType(addedLayer);
  //   this.pubSub.publish(LayersSubscriptionsType.LAYER_ADDED, {
  //     [LayersSubscriptionsType.LAYER_ADDED]: layerObject,
  //   });
  //   return layerObject;
  // }
  // @Subscription(returns => Layer)
  // layerAdded(): AsyncIterator<PubSubEngine, Layer> {
  //   return this.pubSub.asyncIterator(LayersSubscriptionsType.LAYER_ADDED);
  // }
}
