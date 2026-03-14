import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.js';
import { Transaction } from './Transaction.js';

@Entity('savings')
export class Saving {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @ManyToOne(() => User, (user) => user.savings)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.saving)
  transactions!: Transaction[];
}
