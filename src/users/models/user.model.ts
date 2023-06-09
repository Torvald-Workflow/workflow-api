import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from 'src/base/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  id: string;

  @Prop()
  @Field()
  firstName: string;

  @Prop()
  @Field()
  lastName: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field(() => Boolean)
  isActive: boolean;

  @Prop()
  @Field(() => Boolean)
  isAdmin: boolean;

  @Prop()
  @Field({ nullable: true })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
