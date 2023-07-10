import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => String, { description: 'The password of the user' })
  password: string;

  @Field(() => String, { description: 'The password confirmation of the user' })
  passwordConfirmation: string;
}
