import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { CreateLogbookInput } from './dto/CreateLogbookInput';
import { FindLogbooksInput } from './dto/FindLogbooksInput';
import { LogbookEntity } from './entities/logbook.entity';
import { LogbookService } from './logbook.service';

@Resolver(() => LogbookEntity)
export class LogbookResolver {
  constructor(private logbooksService: LogbookService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [LogbookEntity])
  async logbooks(
    @Args('createLogbookInput') findLogbookInput: FindLogbooksInput,
  ) {
    return await this.logbooksService.findBetweenDates(findLogbookInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LogbookEntity)
  async createLogbook(
    @Args('createLogbookInput') createLogbookInput: CreateLogbookInput,
  ) {
    return await this.logbooksService.create(createLogbookInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LogbookEntity)
  async removeLogbook(@Args('id') id: number) {
    return await this.logbooksService.removeOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LogbookEntity)
  async updateLogbook(
    @Args('id') id: number,
    @Args('updateLogbookInput') updateLogbookInput: CreateLogbookInput,
  ) {
    return await this.logbooksService.updateOne(id, updateLogbookInput);
  }
}
