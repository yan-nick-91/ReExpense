import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.js';
import { Saving } from './Saving.js';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Saving, (saving) => saving.goals)
  saving!: Saving;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  targetAmount!: number;

  @Column({
    type: 'datetime',
  })
  createdAt!: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  updatedAt?: string;
}
