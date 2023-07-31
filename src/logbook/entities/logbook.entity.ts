import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logbook')
@ObjectType()
export class LogbookEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number, { description: 'Unique identifier' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Logbook title' })
  title: string;

  @Column('text')
  @Field(() => String, { description: 'Logbook content' })
  content: string;

  @Column()
  @Field(() => Date, { description: 'Logbook date' })
  date: Date;
}
