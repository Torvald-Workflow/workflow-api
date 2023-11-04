import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export abstract class GetUsersParams {
  @ApiProperty({
    description: 'The number of users to skip',
    type: Number,
    example: 25,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public skip?: number = 0;

  @ApiProperty({
    description: 'The number of users to take',
    type: Number,
    required: false,
    example: 25,
  })
  @IsNumber()
  @IsOptional()
  public take?: number = 25;
}
