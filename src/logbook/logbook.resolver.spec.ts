import { Test, TestingModule } from '@nestjs/testing';
import { LogbookResolver } from './logbook.resolver';

describe('LogbookResolver', () => {
  let resolver: LogbookResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogbookResolver],
    }).compile();

    resolver = module.get<LogbookResolver>(LogbookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
