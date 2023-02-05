import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/global/dto/PageMetaDto';
import { PageOptionsDto } from 'src/global/dto/PageOptionsDto';
import { PaginatedElementDto } from 'src/global/dto/PaginatedElementDto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedElementDto<User>> {
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
}
