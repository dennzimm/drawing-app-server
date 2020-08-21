import { HideField, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Model } from '../drawings/models/abstract/model.model';
import { Drawing } from '../drawings/models/drawing.model';

export enum Role {
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends Model {
  email: string;

  firstname?: string;

  lastname?: string;

  role: Role;

  drawings: Drawing[];

  @HideField()
  password: string;
}
