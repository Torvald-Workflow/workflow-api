import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
