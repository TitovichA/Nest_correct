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

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => NewsEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  news!: NewsEntity;

  @Column()
  newsId!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;
}
