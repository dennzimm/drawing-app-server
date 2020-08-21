import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteItemInput {
  @IsNotEmpty()
  name: string;
}
