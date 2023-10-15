import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfig } from 'src/config/throttler.config';
import { JwtModule } from 'src/jwt/jwt.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { BlacklistedTokenEntity } from './entities/blacklisted-token.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([BlacklistedTokenEntity]),
    UsersModule,
    JwtModule,
    MailerModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfig,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
