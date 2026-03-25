import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Saving } from './Saving.js';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Saving, (saving) => saving.transactions)
  @JoinColumn({ name: 'saving_id' })
  saving!: Saving;

  @Column('decimal', { precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 255 })
  category!: string;

  @Column({
    type: 'text',
  })
  type!: TransactionType;

  @Column({
    type: 'text',
  })
  date!: string;
}
