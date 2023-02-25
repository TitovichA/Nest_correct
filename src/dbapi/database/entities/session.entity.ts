import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @Index()
  @Column({ unique: true })
  token!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => UsersEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;
}
