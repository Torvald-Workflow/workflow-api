import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOneConfigurationByKeyInput } from './dto/UpdateOneConfigurationByKeyInput';
import { ConfigurationEntity } from './entities/configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(ConfigurationEntity)
    private configurationRepository: Repository<ConfigurationEntity>,
  ) {}

  async findAllConfigurations() {
    return await this.configurationRepository.find();
  }

  async findOneByKey(key: string) {
    return await this.configurationRepository.findOne({
      where: { key },
    });
  }

  async updateOneByKey(
    updateOneConfigurationByKeyInput: UpdateOneConfigurationByKeyInput,
  ) {
    const currentConfiguration = await this.findOneByKey(
      updateOneConfigurationByKeyInput.key,
    );

    if (!currentConfiguration) {
      throw new Error('Configuration not found');
    }

    currentConfiguration.value = updateOneConfigurationByKeyInput.value;

    return await this.configurationRepository.save(currentConfiguration);
  }

  async updateMultipleByKey(
    configurations: UpdateOneConfigurationByKeyInput[],
  ) {
    const currentConfigurations = await Promise.all(
      configurations.map(async (config) => {
        const currentConfiguration = await this.findOneByKey(config.key);

        if (!currentConfiguration) {
          throw new Error('Configuration not found');
        }

        currentConfiguration.value = config.value;

        return currentConfiguration;
      }),
    );

    return await this.configurationRepository.save(currentConfigurations);
  }
}
