import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field(() => String, { description: 'Unique identifier' })
  id: number;

  @Column()
  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'User last name' })
  lastName: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Column()
  @Field(() => String, { description: 'User isActive state' })
  isActive: boolean;

  @Column()
  @Field(() => String, { description: 'User isAdmin state' })
  isAdmin: boolean;

  @Column()
  @Field(() => String, { nullable: true, description: 'User password' })
  password: string;
}
