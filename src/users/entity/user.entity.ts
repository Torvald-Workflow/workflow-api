import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/global/entity/AbstractEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @ApiProperty({
    description: 'The first name of a user',
    example: 'John',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'The last name of a user',
    example: 'Doe',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'john.doe@domain.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The password of a user',
    example: 'password',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Active status of a user',
    example: true,
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;
}
