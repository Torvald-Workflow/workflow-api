import { Test, TestingModule } from '@nestjs/testing';
import { LogbookService } from './logbook.service';

describe('LogbookService', () => {
  let service: LogbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogbookService],
    }).compile();

    service = module.get<LogbookService>(LogbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
