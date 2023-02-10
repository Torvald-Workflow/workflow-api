import { DATA_SOURCE, USERS_REPOSITORY } from 'src/global/constants';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
];
