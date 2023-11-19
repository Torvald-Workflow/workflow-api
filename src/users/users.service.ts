import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { isInt } from 'class-validator';
import * as crypto from 'crypto';
import { MinioService } from 'nestjs-minio-client';
import { CommonService } from 'src/common/common.service';
import { SLUG_REGEX } from 'src/common/consts/regex.const';
import { isNull, isUndefined } from 'src/common/utils/validation.util';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { GetUsersParams } from './dtos/get-users.params';
import { PasswordDto } from './dtos/password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: EntityRepository<UserEntity>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly minioService: MinioService,
  ) {}

  public async create(
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<UserEntity> {
    const formattedEmail = email.toLowerCase();

    await this.checkEmailUniqueness(formattedEmail);
    await this.checkUsernameUniqueness(username);

    const user = this.usersRepository.create({
      email: formattedEmail,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username,
      password: await hash(password, 10),
      profilePicture: null,
    });
    await this.commonService.saveEntity(this.usersRepository, user, true);
    return user;
  }

  public async findAll(params: GetUsersParams): Promise<UserEntity[]> {
    return this.usersRepository.findAll({
      limit: params.take,
      offset: params.skip,
    });
  }

  public async findOneById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ id });
    this.commonService.checkEntityExistence(user, 'User');
    return user;
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      email: email.toLowerCase(),
    });
    this.throwUnauthorizedException(user);
    return user;
  }

  public async findOneByUsername(
    username: string,
    forAuth = false,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      username: username.toLowerCase(),
    });

    if (forAuth) {
      this.throwUnauthorizedException(user);
    } else {
      this.commonService.checkEntityExistence(user, 'User');
    }

    return user;
  }

  public async update(userId: number, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { firstName, lastName, username } = dto;

    await this.checkUsernameUniqueness(username);
    user.username = username;
    user.firstName = firstName.toLowerCase();
    user.lastName = lastName.toLowerCase();

    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async updateAvatar(
    userId: number,
    avatar: Express.Multer.File,
  ): Promise<UserEntity> {
    if (
      !(avatar.mimetype.includes('png') || avatar.mimetype.includes('jpeg'))
    ) {
      throw new BadRequestException('Invalid file type');
    }

    const user = await this.findOneById(userId);

    const tempAvatarName = `${user.id}-${Date.now()}-${avatar.originalname}`;
    const hashedAvatarName = crypto
      .createHash('md5')
      .update(tempAvatarName)
      .digest('hex');

    const extension = avatar.originalname.substring(
      avatar.originalname.lastIndexOf('.'),
      avatar.originalname.length,
    );

    const filename = user.id + '/' + hashedAvatarName + extension;
    const fileBuffer = avatar.buffer;

    await this.minioService.client
      .putObject('workflow', filename, fileBuffer)
      .catch((err) => {
        console.log(err);
      });

    user.profilePicture = `${this.configService.get(
      'MINIO_BUCKET',
    )}/${filename}`;

    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async updateEmail(
    userId: number,
    dto: ChangeEmailDto,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { email, password } = dto;

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    const formattedEmail = email.toLowerCase();
    await this.checkEmailUniqueness(formattedEmail);
    user.credentials.updateVersion();
    user.email = formattedEmail;
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async updatePassword(
    userId: number,
    password: string,
    newPassword: string,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (!(await compare(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    if (await compare(newPassword, user.password)) {
      throw new BadRequestException('New password must be different');
    }

    user.credentials.updatePassword(user.password);
    user.password = await hash(newPassword, 10);
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async resetPassword(
    userId: number,
    version: number,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.findOneByCredentials(userId, version);
    user.credentials.updatePassword(user.password);
    user.password = await hash(password, 10);
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async confirmEmail(
    userId: number,
    version: number,
  ): Promise<UserEntity> {
    const user = await this.findOneByCredentials(userId, version);

    if (user.confirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    user.confirmed = true;

    user.credentials.updateVersion();

    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async remove(userId: number, dto: PasswordDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid password');
    }

    await this.commonService.removeEntity(this.usersRepository, user);
    return user;
  }

  // necessary for password reset
  public async uncheckedUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email: email.toLowerCase(),
    });
  }

  public async findOneByIdOrUsername(
    idOrUsername: string,
  ): Promise<UserEntity> {
    const parsedValue = parseInt(idOrUsername, 10);

    if (!isNaN(parsedValue) && parsedValue > 0 && isInt(parsedValue)) {
      return this.findOneById(parsedValue);
    }

    if (
      idOrUsername.length < 3 ||
      idOrUsername.length > 106 ||
      !SLUG_REGEX.test(idOrUsername)
    ) {
      throw new BadRequestException('Invalid username');
    }

    return this.findOneByUsername(idOrUsername);
  }

  public async findOneByCredentials(
    id: number,
    version: number,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ id });
    this.throwUnauthorizedException(user);

    if (user.credentials.version !== version) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async checkEmailUniqueness(email: string): Promise<void> {
    const count = await this.usersRepository.count({ email });

    if (count > 0) {
      throw new ConflictException('Email already in use');
    }
  }

  private throwUnauthorizedException(
    user: undefined | null | UserEntity,
  ): void {
    if (isUndefined(user) || isNull(user)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async checkUsernameUniqueness(username: string): Promise<void> {
    const count = await this.usersRepository.count({ username });

    if (count > 0) {
      throw new ConflictException('Username already in use');
    }
  }
}
