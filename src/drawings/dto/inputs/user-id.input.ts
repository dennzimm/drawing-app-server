import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Using input-types, whole objects can be passed as argument to a field.
 */

/**
 * UserIdInput InputType
 *
 * @export
 * @class UserIdInput
 */
@InputType()
export class UserIdInput {
  @IsNotEmpty()
  userId: string;
}
