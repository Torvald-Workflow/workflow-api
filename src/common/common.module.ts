import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfModule } from './conf.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, AuthModule, ConfModule],
})
export class CommonModule {}
