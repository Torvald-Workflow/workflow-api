import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './mongo.module';

@Module({
  imports: [MongoModule, AuthModule],
})
export class CommonModule {}
