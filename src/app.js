import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dbRoutes from './routes/dbRoutes.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import autenticar from './middlewares/authMiddleware.js';
import infoRoutes from './routes/infoRoutes.js';
import setoresRoutes from './routes/setoresRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// =========== ROTAS DESPROTEGIDAS ===========
app.use('/api', dbRoutes);
app.use('/api', authRoutes);

// =========== ROTAS PROTEGIDAS ===========
app.use('/api', autenticar, infoRoutes);
app.use('/api', autenticar, setoresRoutes);

// =========== VIEWS ===========
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/register.html'));
});

app.get('/dashboard', autenticar, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/dashboard.html'));
});

app.get('/setores', autenticar, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/setores.html'));
});

export default app;
