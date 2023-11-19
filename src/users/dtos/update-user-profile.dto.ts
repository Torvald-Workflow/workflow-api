import { ApiProperty } from '@nestjs/swagger';

export abstract class UpdateUserProfileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
