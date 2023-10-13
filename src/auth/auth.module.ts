import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from 'src/jwt/jwt.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { BlacklistedTokenEntity } from './entities/blacklisted-token.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([BlacklistedTokenEntity]),
    UsersModule,
    JwtModule,
    MailerModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
