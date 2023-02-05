import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { ApiPaginatedResponse } from 'src/global/swaggerDecorator/ApiPaginatedResponse';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiPaginatedResponse(UserEntity)
  async fetchAllUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedElementDto<UserEntity>> {
    return this.usersService.findAllUsers(pageOptionsDto);
  }
}
