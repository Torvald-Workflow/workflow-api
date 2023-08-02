import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateOneConfigurationByKeyInput {
  @Field(() => String, { description: 'The key of the configuration' })
  @IsNotEmpty()
  key: string;

  @Field(() => String, { description: 'The value of the configuration' })
  @IsNotEmpty()
  value: string;
}
