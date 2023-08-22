import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
export class LoggedInUserOutput {
  @Field(() => String, { description: 'JWT token' })
  access_token: string;

  @Field(() => UserEntity, { description: 'The user' })
  user: UserEntity;
}
