import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { config } from './config';
import { validationSchema } from './config/config.schema';
import { MikroOrmConfig } from './config/mikroorm.module';
import { JwtModule } from './jwt/jwt.module';
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MikroOrmConfig,
    }),
    CommonModule,
    UsersModule,
    JwtModule,
    MailerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
