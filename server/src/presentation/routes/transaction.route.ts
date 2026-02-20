import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { readJSON, writeJSON } from '../../infrastructure/storage.js';
import type { Transaction } from '../../types/transactionTypes.js';
import { v4 as uuid } from 'uuid';
import type { AuthRequest } from '../../types/authTypes.js';

const router = Router();
const TRANSACTIONS_FILE = 'transactions.json';

const loadTransactions = (): Transaction[] =>
  readJSON<Transaction[]>(TRANSACTIONS_FILE);
const saveTransactions = (transactions: Transaction[]) =>
  writeJSON(TRANSACTIONS_FILE, transactions);

let transactions = loadTransactions();
let generateId = uuid();

router.post('/create', authMiddleware, (req: AuthRequest, res) => {
  const { amount, category, type } = req.body;

  if (!amount || !category || !type) {
    return res.status(400).json({ error: 'Not all fields contains a value' });
  }

  if (amount <= 0.0) {
    return res.status(400).json({
      error: 'Amount must be greater then 0.0 to create a new transaction',
    });
  }

  if (category === '') {
    return res
      .status(400)
      .json({ error: 'Category cannot have an empty value' });
  }

  const userId = req.user.id;

  const transaction: Transaction = {
    id: generateId,
    userId,
    amount,
    category,
    type,
    date: new Date().toISOString(),
  };

  transactions.push(transaction);
  saveTransactions(transactions);

  res.status(201).json(transaction);
});

router.get('', authMiddleware, (req: AuthRequest, res) => {
  const userId = req.user.id;
  const transactions = loadTransactions();

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === userId,
  );

  return res.status(200).json({ userTransactions });
});

export default router;
