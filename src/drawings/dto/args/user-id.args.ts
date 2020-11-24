import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * UserIdArgs ArgsType
 *
 * @export
 * @class UserIdArgs
 */
@ArgsType()
export class UserIdArgs {
  @IsNotEmpty()
  userId: string;
}
