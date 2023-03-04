import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { NewsEntity } from './news.entity';
import { UsersEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class CommentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ApiProperty()
  @Column()
  text!: string;

  @ApiProperty()
  @ManyToOne(() => UsersEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: UsersEntity;

  @ApiProperty()
  @ManyToOne(() => NewsEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  news!: NewsEntity;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;
}
