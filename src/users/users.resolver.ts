import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { OnlyAdminUserInterceptor } from 'src/common/auth/interceptors/admin.interceptor';
import { CreateUserInput } from './dto/CreateUserInput';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyAdminUserInterceptor)
  @Query(() => [UserEntity])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity)
  async userById(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log(createUserInput);
    return await this.usersService.create(createUserInput);
  }
}
