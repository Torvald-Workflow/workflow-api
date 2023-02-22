import { Module } from '@nestjs/common';
import { mailerProvider } from './mailer.provider';

@Module({
  providers: [...mailerProvider],
  exports: [...mailerProvider],
})
export class MailerModule {}
