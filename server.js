import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

// Serve static frontend from /public
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Start at login page
app.get('/', (_req, res) => {
  res.redirect('/login.html');
});

// Optional healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Athena web running on http://localhost:${PORT}`);
});


