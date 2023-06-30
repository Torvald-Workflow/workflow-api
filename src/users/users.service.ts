import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/CreateUserInput';
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
    createdUser.password = password;
    createdUser.isActive = true;
    createdUser.isAdmin = false;

    return await this.usersRepository.save(createdUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
