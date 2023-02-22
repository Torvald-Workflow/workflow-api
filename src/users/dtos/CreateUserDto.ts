import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of a user',
    example: 'John',
    type: String,
  })
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of a user',
    example: 'Doe',
    type: String,
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'john.doe@domain.com',
    type: String,
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The password of a user',
    example: 'password',
  })
  @IsString()
  readonly password: string;
}
