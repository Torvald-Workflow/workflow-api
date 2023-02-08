import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/constants';
import { PageMetaDto } from 'src/global/dto/PageMetaDto';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

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

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await this.usersRepository.save(user);
  }

  // async deleteUsers(deleteUsersDto: DeleteUsersDto): Promise<UserEntity[]> {
  //   const queryBuilder = this.usersRepository.createQueryBuilder('user');

  //   queryBuilder.where('user.id IN (:...ids)', {}).orderBy('user.id', 'ASC');

  //   await this.usersRepository.remove(users);
  // }
}
