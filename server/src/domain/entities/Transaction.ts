import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.js';
import { Saving } from './Saving.js';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Saving, (balance) => balance.transactions)
  @JoinColumn({ name: 'balance_id'})
  balance!: Saving;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 255 })
  category!: string;

  @Column({
    type: 'text',
  })
  type!: TransactionType;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: string | Date) => value,
      from: (value: Date) => value.toISOString(),
    },
  })
  date!: string;
}
