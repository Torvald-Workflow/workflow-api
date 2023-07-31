import { Module } from '@nestjs/common';
import { LogbookResolver } from './logbook.resolver';
import { LogbookService } from './logbook.service';

@Module({
  providers: [LogbookResolver, LogbookService],
})
export class LogbookModule {}
