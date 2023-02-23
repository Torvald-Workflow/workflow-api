import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { ApiPaginatedResponse } from 'src/global/swaggerDecorator/ApiPaginatedResponse';
import { CreateUserDto } from './dtos/CreateUserDto';
import { DeleteUsersDto } from './dtos/DeleteUsersDto';
import { EditUserDto } from './dtos/EditUserDto';
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
  async fetchUser(@Param('id', ParseIntPipe) id: number) {
    const foundUser = await this.usersService.findUser(id);

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  @Post()
  @ApiOkResponse({ type: UserEntity })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService
      .createUser(createUserDto)
      .then((createdUser) => {
        return createdUser;
      })
      .catch((err) => {
        if (err.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('Email already exists');
        }
      });
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ type: 'number', name: 'id' })
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.usersService
      .editUser(id, editUserDto)
      .then((editedUser) => {
        console.log(editedUser);
        if (!editedUser) {
          throw new NotFoundException();
        }
        return editedUser;
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('Email already exists');
        }

        throw new BadRequestException();
      });
  }

  @Post('/deleteUsers')
  @ApiOkResponse({ type: [UserEntity] })
  async deleteUsers(@Body() deleteUsersDto: DeleteUsersDto) {
    return this.usersService.deleteMultipleUsers(deleteUsersDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ type: 'number', name: 'id' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundException();
    }

    return deletedUser;
  }
}
