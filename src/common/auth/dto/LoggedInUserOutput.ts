import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedInUserOutput {
  @Field(() => String, { description: 'JWT token' })
  access_token: string;
}
