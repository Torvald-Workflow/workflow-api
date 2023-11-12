import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get<string>('MINIO_ENDPOINT'),
        port: configService.get<number>('MINIO_PORT'),
        useSSL: configService.get<boolean>('MINIO_USE_SSL'),
        accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
        secretKey: configService.get<string>('MINIO_SECRET_KEY'),
      }),
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
