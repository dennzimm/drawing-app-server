import { Field, ObjectType } from '@nestjs/graphql';
import { MutationPayload } from '../../common/interfaces/mutation.interface';
import { MutationType } from '../../enums/mutation.enums';
import { PathMutationType } from '../../enums/path.enums';
import { PathObjectType as Path } from '../../models/path.model';
import { SegmentObjectType as Segment } from '../../models/segment.model';

@ObjectType('PathMutation')
export class PathMutationPayload
  implements MutationPayload<Path, PathMutationPayload> {
  @Field((type) => MutationType)
  mutation: PathMutationPayload;

  @Field((type) => Path)
  node: Path;
}

@ObjectType('SegmentAdded')
export class SegmentAddedPayload
  implements MutationPayload<Segment, PathMutationType.SEGMENT_ADDED> {
  @Field((type) => PathMutationType)
  mutation: PathMutationType.SEGMENT_ADDED;

  @Field((type) => Segment)
  node: Segment;
}
