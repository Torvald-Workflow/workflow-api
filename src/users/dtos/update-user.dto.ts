import { IsString, Length, Matches } from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from '../../common/consts/regex.const';

export abstract class UpdateUserDto {
  @IsString({ always: true })
  @Length(3, 106)
  @Matches(SLUG_REGEX, {
    message: 'Username must be a valid slugs',
  })
  public username?: string;

  @IsString({ always: true })
  @Length(2, 255)
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  public firstName?: string;

  @IsString({ always: true })
  @Length(2, 255)
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  public lastName?: string;
}
