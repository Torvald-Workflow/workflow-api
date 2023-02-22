import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'The first name of a user',
    example: 'John',
    type: String,
  })
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of a user',
    example: 'Doe',
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'john.doe@domain.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The state of the user',
  })
  @IsBoolean()
  readonly isActive: boolean;
}
