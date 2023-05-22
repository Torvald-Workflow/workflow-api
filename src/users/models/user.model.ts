import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/base/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isAdmin: boolean;

  @Field({ nullable: true })
  password?: string;
}
