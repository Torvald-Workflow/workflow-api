import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/CreateUserInput';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel();

    createdUser.firstName = createUserInput.firstName;
    createdUser.lastName = createUserInput.lastName;
    createdUser.email = createUserInput.email;
    createdUser.password = createUserInput.password;
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
}
