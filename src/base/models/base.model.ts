import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
