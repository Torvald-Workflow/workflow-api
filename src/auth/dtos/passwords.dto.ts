import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../../common/consts/regex.const';

export abstract class PasswordsDto {
  @ApiProperty({
    description: 'First password',
    example: '123Aze+++',
    minLength: 3,
    maxLength: 100,
    type: String,
  })
  @IsString()
  @Length(8, 35)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password requires a lowercase letter, an uppercase letter, and a number or symbol',
  })
  public password1!: string;

  @ApiProperty({
    description: 'Repeat password',
    example: '123Aze+++',
    minLength: 3,
    maxLength: 100,
    type: String,
  })
  @IsString()
  @MinLength(1)
  public password2!: string;
}
