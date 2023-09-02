import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'The first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'The last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'The username of the user' })
  username: string;

  @Field(() => String, { description: 'The email of the user' })
  email: string;

  @Field(() => Boolean, { description: 'The active state of the user' })
  isActive: boolean;
}
