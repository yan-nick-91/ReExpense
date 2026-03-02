import { DataSource } from 'typeorm';
import { User } from '../../domain/entities/User.js';
import { Transaction } from '../../domain/entities/Transaction.js';
import { Goal } from '../../domain/entities/Goal.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'reexpense.sqlite',
  synchronize: true,
  logging: false,
  entities: [Goal, Transaction, User],
});
