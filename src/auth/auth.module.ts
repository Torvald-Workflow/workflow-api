import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.provider';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, DatabaseModule],
  providers: [UsersService, AuthService, LocalStrategy, ...usersProviders],
  controllers: [AuthController],
})
export class AuthModule {}
