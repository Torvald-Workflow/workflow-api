import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/global/entity/AbstractEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
