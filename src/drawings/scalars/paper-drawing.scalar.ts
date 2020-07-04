import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { PaperDataHelper } from '../common/helper/paper-data.helper';
import { PaperDrawingData } from '../interfaces/paper-drawing.interface';

@Scalar('PaperDrawing')
export class PaperDrawingScalar
  implements CustomScalar<string, PaperDrawingData> {
  description = 'PaperDrawing custom scalar type';

  constructor(
    private readonly paperDataHelper: PaperDataHelper<PaperDrawingData>,
  ) {}

  // value from the client
  parseValue(value: string): PaperDrawingData {
    return this.paperDataHelper.parse(
      value,
      this.paperDataHelper.validateDrawingData,
    );
  }

  // value sent to the client
  serialize(value: PaperDrawingData): string {
    return this.paperDataHelper.serialize(
      value,
      this.paperDataHelper.validateDrawingData,
    );
  }

  parseLiteral(ast: ValueNode): PaperDrawingData {
    return this.paperDataHelper.parseLiteral(
      ast,
      this.paperDataHelper.validateDrawingData,
    );
  }
}
