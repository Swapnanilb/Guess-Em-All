import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/guessemall';
const certPath = process.env.MONGODB_CERT_PATH || './X509-cert-7305663332598231763.pem';

// MongoDB client options for X.509
const clientOptions = {
  tls: true,
  tlsCertificateKeyFile: path.resolve(certPath)
};

const client = new MongoClient(connectionString, clientOptions);

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('guessemall');
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// Verify reCAPTCHA
async function verifyCaptcha(token) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
  });
  const data = await response.json();
  return data.success;
}

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password, captchaToken } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  if (!captchaToken) {
    return res.status(400).json({ error: 'Please complete the captcha' });
  }
  
  const captchaValid = await verifyCaptcha(captchaToken);
  if (!captchaValid) {
    return res.status(400).json({ error: 'Invalid captcha' });
  }

  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }

  try {
    const users = db.collection('users');
    const user = await users.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      user: { username, caught: user.caught || {}, escaped: user.escaped || {} },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { username, password, captchaToken } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  if (!captchaToken) {
    return res.status(400).json({ error: 'Please complete the captcha' });
  }
  
  const captchaValid = await verifyCaptcha(captchaToken);
  if (!captchaValid) {
    return res.status(400).json({ error: 'Invalid captcha' });
  }

  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }

  try {
    const users = db.collection('users');
    const existingUser = await users.findOne({ username });
    
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists. Please choose a unique username.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      password: hashedPassword,
      caught: {},
      escaped: {},
      createdAt: new Date()
    };
    await users.insertOne(user);
    
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      user: { username, caught: {}, escaped: {} },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Verify token endpoint
app.post('/api/auth/verify', verifyToken, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: { username: user.username, caught: user.caught || {}, escaped: user.escaped || {} } });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Save user data (protected)
app.post('/api/user/save', verifyToken, async (req, res) => {
  const { caught, escaped } = req.body;
  
  if (!db) {
    return res.status(503).json({ error: 'Database not available. Please try again later.' });
  }
  
  try {
    await db.collection('users').updateOne(
      { username: req.user.username },
      { $set: { caught, escaped, updatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Save failed' });
  }
});

const PORT = process.env.PORT || 3005;

// Start server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
connectDB();