import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteUsersDto {
  @ApiProperty({
    description: 'The ids of the users to delete',
    example: [1, 2, 3],
    type: Number,
    isArray: true,
  })
  @IsNumber({}, { each: true })
  readonly ids: number[];
}
