import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateLogbookInput } from './dto/CreateLogbookInput';
import { FindLogbooksInput } from './dto/FindLogbooksInput';
import { UpdateLogbookInput } from './dto/UpdateLogbookInput';
import { LogbookEntity } from './entities/logbook.entity';

@Injectable()
export class LogbookService {
  constructor(
    @InjectRepository(LogbookEntity)
    private logbookRepository: Repository<LogbookEntity>,
  ) {}

  async findBetweenDates(findLogbookInput: FindLogbooksInput) {
    return await this.logbookRepository.find({
      where: {
        date: Between(findLogbookInput.startDate, findLogbookInput.endDate),
      },
    });
  }

  async create(createLogbookInput: CreateLogbookInput) {
    const createdLogbook = new LogbookEntity();

    createdLogbook.title = createLogbookInput.title;
    createdLogbook.content = createLogbookInput.content;
    createdLogbook.date = createLogbookInput.date;

    return await this.logbookRepository.save(createdLogbook);
  }

  async findOne(id: number) {
    return await this.logbookRepository.findOneBy({ id });
  }

  async removeOne(id: number) {
    const currentLogbook = await this.findOne(id);

    if (!currentLogbook) {
      throw new Error('Logbook not found');
    }

    await this.logbookRepository.delete({ id });
  }

  async updateOne(id: number, updateLogbookInput: UpdateLogbookInput) {
    const currentLogbook = await this.findOne(id);

    if (!currentLogbook) {
      throw new Error('Logbook not found');
    }

    currentLogbook.title = updateLogbookInput.title;
    currentLogbook.content = updateLogbookInput.content;
    currentLogbook.date = updateLogbookInput.date;

    return await this.logbookRepository.save(currentLogbook);
  }
}
