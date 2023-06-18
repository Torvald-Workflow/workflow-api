import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../../users/users.service';
import { LoggedInUserOutput } from './dto/LoggedInUserOutput';
import { LoginUserInput } from './dto/LoginUserInput';

@Resolver()
export class AuthResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => LoggedInUserOutput)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }
}
