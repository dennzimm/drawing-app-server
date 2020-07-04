import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { PaperDataHelper } from '../common/helper/paper-data.helper';
import { PaperSegmentData } from '../interfaces/paper-segment.interface';

@Scalar('PaperSegment')
export class PaperSegmentScalar
  implements CustomScalar<string, PaperSegmentData> {
  description = 'PaperSegment custom scalar type';

  constructor(
    private readonly paperDataHelper: PaperDataHelper<PaperSegmentData>,
  ) {}

  // value from the client
  parseValue(value: string): PaperSegmentData {
    return this.paperDataHelper.parse(
      value,
      this.paperDataHelper.validateSegmentData,
    );
  }

  // value sent to the client
  serialize(value: PaperSegmentData): string {
    return this.paperDataHelper.serialize(
      value,
      this.paperDataHelper.validateSegmentData,
    );
  }

  parseLiteral(ast: ValueNode): PaperSegmentData {
    return this.paperDataHelper.parseLiteral(
      ast,
      this.paperDataHelper.validateSegmentData,
    );
  }
}
