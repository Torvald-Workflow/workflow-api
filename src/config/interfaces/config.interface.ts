import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';

export interface IConfig {
  port: number;
  domain: string;
  db: MikroOrmModuleOptions;
  jwt: IJwt;
  emailService: IEmailConfig;
  throttler: ThrottlerModuleOptions;
}
