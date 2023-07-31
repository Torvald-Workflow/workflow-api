import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { OnlyAdminUserInterceptor } from 'src/common/auth/interceptors/admin.interceptor';
import { CreateUserInput } from './dto/CreateUserInput';
import { FetchUsersArgs } from './dto/FetchUsersArgs';
import { UpdateUserPasswordInput } from './dto/UpdateUserPasswordInput';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/UpdateUserInput';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyAdminUserInterceptor)
  @Query(() => [UserEntity])
  async users(@Args() args: FetchUsersArgs) {
    return this.usersService.findAll(args);
  }

  @Query(() => Number)
  async countUsers() {
    return this.usersService.countAllUsers();
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

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: number) {
    return await this.usersService.removeOne(id);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.updateOne(id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  async updateUserPassword(
    @Args('id') id: number,
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    return await this.usersService.updatePassword(id, updateUserPasswordInput);
  }
}
