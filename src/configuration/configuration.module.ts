import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationResolver } from './configuration.resolver';
import { ConfigurationService } from './configuration.service';
import { ConfigurationEntity } from './entities/configuration.entity';

@Module({
  providers: [ConfigurationService, ConfigurationResolver],
  exports: [ConfigurationService],
  imports: [TypeOrmModule.forFeature([ConfigurationEntity])],
})
export class ConfigurationModule {}
