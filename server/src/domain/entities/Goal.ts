import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.js';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.goals)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  savings!: number;

  @Column({
    type: 'datetime',
    transformer: {
      to: (value: string | Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  createdAt!: string;

  @Column({
    type: 'datetime',
    nullable: true,
    transformer: {
      to: (value: string | Date) => value,
      from: (value: Date | null) => value?.toISOString() || null,
    },
  })
  updatedAt?: string;
}
