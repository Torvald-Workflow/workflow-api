import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ type: 'number', name: 'id' })
  async fetchUser(@Req() request, @Param('id', ParseIntPipe) id: number) {
    const foundUser = await this.usersService.findUser(id);

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }
}
