import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { ApiPaginatedResponse } from 'src/global/swaggerDecorator/ApiPaginatedResponse';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiPaginatedResponse(User)
  async fetchAllUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedElementDto<User>> {
    return this.usersService.findAllUsers(pageOptionsDto);
  }
}
