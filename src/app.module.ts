import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAILER_HOST'),
          port: parseInt(config.get('MAILER_PORT')),
          ignoreTLS: config.get('MAILER_IGNORE_TLS') === 'true',
          secure: config.get('MAILER_SECURE') === 'true',
          auth: {
            user: config.get('MAILER_USER'),
            pass: config.get('MAILER_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
