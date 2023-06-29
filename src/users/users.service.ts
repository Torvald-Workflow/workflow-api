import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/CreateUserInput';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel();

    const password = await bcrypt.hash(createUserInput.password, 10);

    createdUser.firstName = createUserInput.firstName;
    createdUser.lastName = createUserInput.lastName;
    createdUser.email = createUserInput.email;
    createdUser.password = password;
    createdUser.isActive = true;
    createdUser.isAdmin = false;

    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
