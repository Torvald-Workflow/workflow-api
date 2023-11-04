import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from '../../common/consts/regex.const';
import { PasswordsDto } from './passwords.dto';

export abstract class SignUpDto extends PasswordsDto {
  @ApiProperty({
    description: 'User username',
    example: 'john.doe1',
    minLength: 3,
    maxLength: 100,
    type: String,
  })
  @IsString()
  @Length(3, 100, {
    message: 'Name has to be between 3 and 50 characters.',
  })
  @Matches(SLUG_REGEX, {
    message:
      'Name can only contain letters, number, underscores, minux and dots.',
  })
  public username!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  @IsString({ always: true })
  @Length(2, 255, {
    message: 'First name has to be between 2 and 255 characters.',
  })
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  public firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    minLength: 2,
    maxLength: 255,
    type: String,
  })
  @IsString({ always: true })
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  @Length(2, 255, {
    message: 'Surname has to be between 2 and 255 characters.',
  })
  public lastName!: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@email.com',
    type: String,
  })
  @IsString()
  @IsEmail()
  @Length(5, 255)
  public email!: string;
}
