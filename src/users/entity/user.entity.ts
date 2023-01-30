import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of a user',
    minimum: 1,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

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
