import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  type AuthRequest,
  type SafeUser,
  type User,
} from '../../types/authTypes.js';
import { revokeToken } from '../../infrastructure/token.store.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { readJSON, writeJSON } from '../../infrastructure/storage.js';
import { JWT_SECRET } from '../config/config.js';
import { v4 as uuid } from 'uuid';

const router = Router();
const USERS_FILE = 'users.json';

const loadUsers = (): User[] => readJSON<User[]>(USERS_FILE);
const saveUsers = (users: User[]) => writeJSON(USERS_FILE, users);

let users = loadUsers();
let generateId = uuid();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const existing = users.find((u) => u.email === email);
  if (existing) return res.status(409).json({ error: ' User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: generateId, email, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
});

router.post('/authenticated', authMiddleware, (req: AuthRequest, res) => {
  res.status(200).json({ user: req.user });
});

router.put(
  '/update/password',
  authMiddleware,
  async (req: AuthRequest, res) => {
    const { currentPassword, newPassword } = req.body;

    users = loadUsers();
    const userId = req.user.id;
    const user = users.find((u) => u.id === userId);

    if (!user)
      res
        .status(500)
        .json({ error: 'Some went wrong during password editing' });

    const currentPasswordIsValid = await bcrypt.compare(
      currentPassword,
      user!.password,
    );

    if (!currentPasswordIsValid) {
      res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user!.password = hashedPassword;
    saveUsers(users);

    const newToken = jwt.sign({ id: user!.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Password updated', token: newToken });
  },
);

router.delete('/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]!;
  revokeToken(token);

  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
