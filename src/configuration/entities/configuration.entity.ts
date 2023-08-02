import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configuration')
@ObjectType()
export class ConfigurationEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number, { description: 'Unique identifier' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Configuration key' })
  key: string;

  @Column()
  @Field(() => String, { description: 'Configuration value' })
  value: string;
}
