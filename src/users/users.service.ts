import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/CreateUserInput';
import { FetchUsersArgs } from './dto/FetchUsersArgs';
import { UpdateUserInput } from './dto/UpdateUserInput';
import { UpdateUserPasswordInput } from './dto/UpdateUserPasswordInput';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = new UserEntity();

    const password = await bcrypt.hash(createUserInput.password, 10);

    createdUser.firstName = createUserInput.firstName;
    createdUser.lastName = createUserInput.lastName;
    createdUser.email = createUserInput.email;
    createdUser.username = createUserInput.username;
    createdUser.password = password;
    createdUser.isActive = true;
    createdUser.isAdmin = false;

    return await this.usersRepository.save(createdUser);
  }

  async findAll(args: FetchUsersArgs) {
    return await this.usersRepository.find({
      skip: args.skip,
      take: args.take,
    });
  }

  async countAllUsers() {
    return await this.usersRepository.count();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findMyself(userId: number) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async removeOne(id: number) {
    const currentUser = await this.findOne(id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete({ id });

    return currentUser;
  }

  async updateOne(id: number, updateUserInput: UpdateUserInput) {
    const currentUser = await this.findOne(id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    currentUser.firstName = updateUserInput.firstName;
    currentUser.lastName = updateUserInput.lastName;
    currentUser.email = updateUserInput.email;
    currentUser.isActive = updateUserInput.isActive;
    currentUser.username = updateUserInput.username;

    const updatedUser = await this.usersRepository.save(currentUser);

    console.log(updatedUser);

    return updatedUser;
  }

  async updatePassword(
    id: number,
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    const currentUser = await this.findOne(id);

    if (
      updateUserPasswordInput.password !==
      updateUserPasswordInput.passwordConfirmation
    ) {
      throw new Error('Passwords does not match');
    }

    if (!currentUser) {
      throw new Error('User not found');
    }

    const newPassword = await bcrypt.hash(updateUserPasswordInput.password, 10);

    currentUser.password = newPassword;

    return await this.usersRepository.save(currentUser);
  }
}
