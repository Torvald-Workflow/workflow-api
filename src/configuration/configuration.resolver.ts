import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { OnlyAdminUserInterceptor } from 'src/common/auth/interceptors/admin.interceptor';
import { ConfigurationService } from './configuration.service';
import { UpdateOneConfigurationByKeyInput } from './dto/UpdateOneConfigurationByKeyInput';
import { ConfigurationEntity } from './entities/configuration.entity';

@Resolver(() => ConfigurationEntity)
export class ConfigurationResolver {
  constructor(private configuartionService: ConfigurationService) {}

  @Query(() => [ConfigurationEntity])
  async configurations() {
    return await this.configuartionService.findAllConfigurations();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyAdminUserInterceptor)
  @Mutation(() => ConfigurationEntity)
  async updateConfiguration(
    @Args('configuration')
    configuration: UpdateOneConfigurationByKeyInput,
  ) {
    return await this.configuartionService.updateOneByKey(configuration);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyAdminUserInterceptor)
  @Mutation(() => [ConfigurationEntity])
  async updateConfigurations(
    @Args('configurations', { type: () => [UpdateOneConfigurationByKeyInput] })
    configurations: UpdateOneConfigurationByKeyInput[],
  ) {
    return await this.configuartionService.updateMultipleByKey(configurations);
  }
}
