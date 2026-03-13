import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction.js';
import { Goal } from './Goal.js';
import { Saving } from './Saving.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetToken?: string | null;

  @Column({ type: 'datetime', nullable: true })
  passwordResetExpires?: Date | null;

  @OneToMany(() => Saving, (saving) => saving.user)
  savings!: Saving[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals!: Goal[];
}
