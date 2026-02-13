import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './presentation/routes/auth.routes.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 443;
const CLIENT_PORT = process.env.CLIENT_PORT

app.use(
  cors({
    origin: `https://localhost:${CLIENT_PORT}`,
    credentials: true
  })
)

app.use(express.json());

app.use('/api', authRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'App is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`⚡ HTTP server is running on http://localhost:${PORT}`);
});
