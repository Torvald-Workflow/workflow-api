import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
  imports: [DatabaseModule],
})
export class UsersModule {}
