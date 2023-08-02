import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindConfigurationByKeyInput {
  @Field(() => String, { description: 'The key of the configuration' })
  @IsNotEmpty()
  key: string;
}
