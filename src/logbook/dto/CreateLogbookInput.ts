import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLogbookInput {
  @Field(() => String, { description: 'The title of the logbook' })
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'The content of the logbook' })
  @IsNotEmpty()
  content: string;

  @Field(() => Date, { description: 'The date of the logbook' })
  @IsNotEmpty()
  date: Date;
}
