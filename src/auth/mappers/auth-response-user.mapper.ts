import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../../users/interfaces/user.interface';
import { IAuthResponseUser } from '../interfaces/auth-response-user.interface';

export class AuthResponseUserMapper implements IAuthResponseUser {
  @ApiProperty({
    description: 'User id',
    example: 123,
    minimum: 1,
    type: Number,
  })
  public id: number;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  public lastName: string;

  @ApiProperty({
    description: 'User username',
    example: 'john.doe1',
    minLength: 3,
    maxLength: 106,
    type: String,
  })
  public username: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@email.com',
    type: String,
  })
  public email: string;

  @ApiProperty({
    description: 'User profile picture',
    example: 'https://example.com/profile-picture.png',
    type: String,
  })
  public profilePicture?: string;

  @ApiProperty({
    description: 'User creation date',
    example: '2021-01-01T00:00:00.000Z',
    type: String,
  })
  public createdAt: string;

  @ApiProperty({
    description: 'User update date',
    example: '2021-01-01T00:00:00.000Z',
    type: String,
  })
  public updatedAt: string;

  constructor(values: IAuthResponseUser) {
    Object.assign(this, values);
  }

  public static map(user: IUser): AuthResponseUserMapper {
    return new AuthResponseUserMapper({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  }
}
