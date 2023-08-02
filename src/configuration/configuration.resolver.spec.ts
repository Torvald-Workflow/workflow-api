import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationResolver } from './configuration.resolver';

describe('ConfigurationResolver', () => {
  let resolver: ConfigurationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationResolver],
    }).compile();

    resolver = module.get<ConfigurationResolver>(ConfigurationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
