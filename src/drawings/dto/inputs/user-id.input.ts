import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserIdInput {
  @IsNotEmpty()
  userId: string;
}
