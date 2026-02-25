import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true})
  email!: string;

  @Column({ type: 'varchar', length: 255})
  password!: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true})
  passwordResetToken?: string | null;

  @Column({ type: 'datetime', nullable: true})
  passwordResetExpires?: Date | null

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];
}
