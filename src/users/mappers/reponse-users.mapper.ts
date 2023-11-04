import { ApiProperty } from '@nestjs/swagger';
import { IResponseUsers } from '../interfaces/response-users.interface';
import { IUser } from '../interfaces/user.interface';

export class ResponseUsersMapper implements IResponseUsers {
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
    description: 'User confirmation status',
    example: true,
    type: Boolean,
  })
  confirmed: boolean;

  @ApiProperty({
    description: 'User creation date',
    example: '2021-01-01T00:00:00.000Z',
    type: String,
  })
  public createdAt: string;

  @ApiProperty({
    description: 'User last update date',
    example: '2021-01-01T00:00:00.000Z',
    type: String,
  })
  public updatedAt: string;

  constructor(values: IResponseUsers) {
    Object.assign(this, values);
  }

  public static map(user: IUser): ResponseUsersMapper {
    return new ResponseUsersMapper({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      confirmed: user.confirmed,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  }
}
