import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindLogbooksInput {
  @Field(() => Date, { description: 'The start date where to search logbook' })
  @IsNotEmpty()
  startDate: Date;

  @Field(() => Date, { description: 'The end date where to search logbook' })
  @IsNotEmpty()
  endDate: Date;
}
