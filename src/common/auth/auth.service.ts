import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { LoginUserInput } from './dto/LoginUserInput';

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
}
