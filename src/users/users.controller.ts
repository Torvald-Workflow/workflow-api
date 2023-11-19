import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IAuthResponseUser } from 'src/auth/interfaces/auth-response-user.interface';
import { AuthResponseUserMapper } from 'src/auth/mappers/auth-response-user.mapper';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { GetUserParams } from './dtos/get-user.params';
import { GetUsersParams } from './dtos/get-users.params';
import { PasswordDto } from './dtos/password.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IResponseUser } from './interfaces/response-user.interface';
import { ResponseUserMapper } from './mappers/reponse-user.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private cookiePath = '/auth';
  private cookieName: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get<string>('COOKIE_NAME');
  }

  @Get('/')
  @ApiOkResponse({
    type: ResponseUserMapper,
    isArray: true,
  })
  public async getUsers(
    @Param() params: GetUsersParams,
  ): Promise<IResponseUser[]> {
    const users = await this.usersService.findAll(params);
    return users.map((user) => ResponseUserMapper.map(user));
  }

  @Get('/:idOrUsername')
  @ApiOkResponse({
    type: ResponseUserMapper,
    description: 'The user is found and returned.',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body',
  })
  @ApiNotFoundResponse({
    description: 'The user is not found.',
  })
  public async getUser(@Param() params: GetUserParams): Promise<IResponseUser> {
    const user = await this.usersService.findOneByIdOrUsername(
      params.idOrUsername,
    );
    return ResponseUserMapper.map(user);
  }

  @Patch('/email')
  @ApiOkResponse({
    type: AuthResponseUserMapper,
    description: 'The email is updated, and the user is returned.',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body, or wrong password.',
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not logged in.',
  })
  public async updateEmail(
    @CurrentUser() id: number,
    @Body() dto: ChangeEmailDto,
  ): Promise<IAuthResponseUser> {
    const user = await this.usersService.updateEmail(id, dto);
    return AuthResponseUserMapper.map(user);
  }

  @Patch()
  @ApiOkResponse({
    type: ResponseUserMapper,
    description: 'The username is updated.',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body.',
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not logged in.',
  })
  public async updateUser(
    @CurrentUser() id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.usersService.update(id, dto);
    return ResponseUserMapper.map(user);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBody({
    description: 'The avatar image file.',
    type: UpdateUserProfileDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: ResponseUserMapper,
    description: 'The avatar is updated.',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body.',
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not logged in.',
  })
  public async updateAvatar(
    @CurrentUser() id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /image\/(png|jpeg)/,
          }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<IResponseUser> {
    const user = await this.usersService.updateAvatar(id, avatar);
    return ResponseUserMapper.map(user);
  }

  @Delete()
  @ApiNoContentResponse({
    description: 'The user is deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Something is invalid on the request body, or wrong password.',
  })
  @ApiUnauthorizedResponse({
    description: 'The user is not logged in.',
  })
  public async deleteUser(
    @CurrentUser() id: number,
    @Body() dto: PasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.usersService.remove(id, dto);
    res
      .clearCookie(this.cookieName, { path: this.cookiePath })
      .status(HttpStatus.NO_CONTENT)
      .send();
  }
}
