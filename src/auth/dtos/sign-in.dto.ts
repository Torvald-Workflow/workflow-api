import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MinLength } from 'class-validator';

export abstract class SignInDto {
  @ApiProperty({
    description: 'User email or username',
    example: 'john.doe1',
    minLength: 3,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @Length(3, 255)
  public emailOrUsername: string;

  @ApiProperty({
    description: 'User password',
    example: '123Aze+++',
    minLength: 1,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @MinLength(1)
  public password: string;
}
