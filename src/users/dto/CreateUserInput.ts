import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'The first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'The last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'The email of the user' })
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  password: string;
}
