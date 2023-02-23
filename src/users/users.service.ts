import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/global/constants';
import { PageMetaDto } from 'src/global/dto/PageMetaDto';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto';
import { DeleteUsersDto } from './dtos/DeleteUsersDto';
import { EditUserDto } from './dtos/EditUserDto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Search for all users in database and return paginated users
   * @param pageOptionsDto PageOptionsDto
   * @returns Promise<PaginatedElementDto<UserEntity>>
   */
  async findAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedElementDto<UserEntity>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    this.mailerService.sendMail({
      to: 'test@test.fr',
      from: 'noreply@workflow.dev',
      subject: 'Testing mail',
      text: 'Welcome',
      html: '<b>Hello world</b>',
    });

    queryBuilder
      .orderBy('user.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.itemsPerPage);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount,
    });

    return new PaginatedElementDto(entities, pageMetaDto);
  }

  /**
   * Fetch a user by id
   * @param id number
   * @returns Promise<UserEntity>
   */
  async findUser(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  /**
   * Create user in database and return created user
   * @param createUserDto CreateUserDto
   * @returns Promise<UserEntity>
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await this.usersRepository.save(user);
  }

  /**
   * Edit a user in database and return edited user
   * @param id number
   * @param createUserDto CreateUserDto
   * @returns Promise<UserEntity>
   */
  async editUser(id: number, editUserDto: EditUserDto): Promise<UserEntity> {
    const user = await this.findUser(id);

    if (!user) {
      throw new NotFoundException();
    }

    user.firstName = editUserDto.firstName;
    user.lastName = editUserDto.lastName;
    user.email = editUserDto.email;

    return await this.usersRepository.save(user);
  }

  /**
   * Delete a user in database and return it
   * @param id number
   * @returns Promise<UserEntity>
   */
  async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.findUser(id);

    await this.usersRepository.remove(user);

    return user;
  }

  /**
   * Delete multiple users in database and return them
   * @param ids number[]
   * @returns Promise<UserEntity[]>
   */
  async deleteMultipleUsers(
    deleteUsersDto: DeleteUsersDto,
  ): Promise<UserEntity[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.id IN (:...ids)', {
        ids: deleteUsersDto.ids,
      })
      .orderBy('user.id', 'ASC');

    const users = await queryBuilder.getMany();

    await this.usersRepository.remove(users);

    return users;
  }
}
