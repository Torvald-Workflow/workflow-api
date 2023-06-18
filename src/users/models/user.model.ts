import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { BaseModel } from 'src/base/models/base.model';

@Schema()
@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop()
  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @Prop()
  @Field(() => String, { description: 'User last name' })
  lastName: string;

  @Prop()
  @Field(() => String, { description: 'User email address' })
  email: string;

  @Prop()
  @Field(() => Boolean, { description: 'User activation state' })
  isActive: boolean;

  @Prop()
  @Field(() => Boolean, { description: 'User isAdmin state' })
  isAdmin: boolean;

  @Prop()
  @Field({ nullable: true })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
