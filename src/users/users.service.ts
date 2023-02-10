import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/global/constants';
import { PageMetaDto } from 'src/global/dto/PageMetaDto';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto';
import { DeleteUsersDto } from './dtos/DeleteUsersDto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<UserEntity>,
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
   * Delete users from database and return deleted users
   * @param deleteUsersDto DeleteUsersDto
   * @returns Promise<UserEntity[]>
   */
  async deleteUsers(deleteUsersDto: DeleteUsersDto): Promise<UserEntity[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.id IN (:...ids)', {
        ids: deleteUsersDto.ids,
      })
      .orderBy('user.id', 'ASC');

    const users = await queryBuilder.getMany();

    await this.usersRepository.remove(await queryBuilder.getMany());

    return users;
  }

  async editUser(id: number, createUserDto: EditUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await this.usersRepository.save(user);
  }
}
