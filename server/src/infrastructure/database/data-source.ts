import { DataSource } from 'typeorm';
import { Saving } from '../../domain/entities/Saving.js';
import { Goal } from '../../domain/entities/Goal.js';
import { Transaction } from '../../domain/entities/Transaction.js';
import { User } from '../../domain/entities/User.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'reexpense.sqlite',
  synchronize: true,
  logging: false,
  entities: [Goal, Saving, Transaction, User],
});
