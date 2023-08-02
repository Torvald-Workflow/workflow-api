import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogbookEntity } from './entities/logbook.entity';
import { LogbookResolver } from './logbook.resolver';
import { LogbookService } from './logbook.service';

@Module({
  providers: [LogbookResolver, LogbookService],
  imports: [TypeOrmModule.forFeature([LogbookEntity])],
  exports: [LogbookService],
})
export class LogbookModule {}
