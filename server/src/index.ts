import 'reflect-metadata'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './presentation/routes/auth.routes.js';
import goalRoutes from './presentation/routes/goal.routes.js'
import savingRoutes from './presentation/routes/saving.routes.js'
import transactionRoutes from './presentation/routes/transaction.route.js';
import { AppDataSource } from './infrastructure/database/data-source.js';
import { globalErrorHandler } from './presentation/middleware/global.exceptions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 443;
const CLIENT_PORT = process.env.CLIENT_PORT;

app.use(
  cors({
      origin: `https://localhost:${CLIENT_PORT}`,
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/goals', goalRoutes);
  app.use('/api/savings',  savingRoutes)
  app.use('/api/transactions', transactionRoutes);

  app.use(globalErrorHandler)
  
  app.get('/', (_req, res) => {
    res.json({ message: 'App is running 🚀' });
  });
  
const startServer = async () => {
  try {
    await AppDataSource.initialize()

    app.listen(PORT, () => {
      console.log(`⚡ HTTP server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer()