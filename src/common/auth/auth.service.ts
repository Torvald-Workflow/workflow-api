import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { LoginUserInput } from './dto/LoginUserInput';
import { RegisterUserInput } from './dto/RegisterUserInput';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.isActive
    ) {
      delete user.password;

      return user;
    }

    return null;
  }

  async generateUserCredentials(user: UserEntity) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );

    if (!user) {
      throw new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'INVALID_CREDENTIALS',
        },
      });
    }

    return this.generateUserCredentials(user);
  }

  async registerUser(registerUserInput: RegisterUserInput) {
    console.log(registerUserInput);
    const user = await this.usersService.findOneByEmail(
      registerUserInput.email,
    );

    if (user) {
      throw new GraphQLError('Email already exists', {
        extensions: {
          code: 'EMAIL_ALREADY_EXISTS',
        },
      });
    }

    if (registerUserInput.password !== registerUserInput.confirmPassword) {
      throw new GraphQLError('Passwords do not match', {
        extensions: {
          code: 'PASSWORDS_DO_NOT_MATCH',
        },
      });
    }

    const newUser = await this.usersService.create({
      ...registerUserInput,
    });

    return this.generateUserCredentials(newUser);
  }
}
