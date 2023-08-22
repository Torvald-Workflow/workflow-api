import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'The first name of the user' })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { description: 'The last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, { description: 'The email of the user' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'The password of the user' })
  @IsNotEmpty()
  password: string;

  @Field(() => String, { description: 'The password of the user' })
  @IsNotEmpty()
  confirmPassword: string;
}
