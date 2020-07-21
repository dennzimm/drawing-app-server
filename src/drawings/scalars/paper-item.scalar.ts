import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { PaperDataHelper } from '../helpers/paper-data.helper';
import { PaperItemData } from '../interfaces/paper-item.interface';

@Scalar('PaperItem')
export class PaperItemScalar implements CustomScalar<string, PaperItemData> {
  description = 'PaperItem custom scalar type';

  constructor(
    private readonly paperDataHelper: PaperDataHelper<PaperItemData>,
  ) {}

  // value from the client
  parseValue(value: string): PaperItemData {
    return this.paperDataHelper.parse(value);
  }

  // value sent to the client
  serialize(value: PaperItemData): string {
    return this.paperDataHelper.serialize(value);
  }

  parseLiteral(ast: ValueNode): PaperItemData {
    return this.paperDataHelper.parseLiteral(ast);
  }
}
