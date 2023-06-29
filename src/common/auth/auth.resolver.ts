import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoggedInUserOutput } from './dto/LoggedInUserOutput';
import { LoginUserInput } from './dto/LoginUserInput';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoggedInUserOutput)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.loginUser(loginUserInput);
  }
}
