import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Twilio setup (add your credentials to .env)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_FROM = process.env.TWILIO_FROM;

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// --- Admission Applications ---
app.get('/admission-applications', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM admission_applications');
  res.json(rows);
});

app.post('/admission-applications', upload.fields([
  { name: 'birth_cert_or_passport', maxCount: 1 },
  { name: 'kjsea_result_slip', maxCount: 1 },
  { name: 'birth_cert', maxCount: 1 },
  { name: 'passport_photo', maxCount: 1 },
  { name: 'assessment_results', maxCount: 1 },
  { name: 'guardian_id_photos', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
    // Save file paths in the database if files are uploaded
    const files = req.files || {};
    const getFilePath = (field) => files[field]?.[0]?.path || null;
    const appData = {
      full_name: data.full_name,
      kjsea_number: data.kjsea_number,
      religion: data.religion,
      health_condition: data.health_condition,
      grade9_marks: data.grade9_marks,
      grade9_year: data.grade9_year,
      guardian_name: data.guardian_name,
      guardian_contact: data.guardian_contact,
      guardian_occupation: data.guardian_occupation,
      guardian_id: data.guardian_id,
      date_of_birth: data.date_of_birth,
      birth_cert_or_passport_media_id: getFilePath('birth_cert_or_passport'),
      kjsea_result_slip_media_id: getFilePath('kjsea_result_slip'),
      birth_cert_media_id: getFilePath('birth_cert'),
      passport_photo_media_id: getFilePath('passport_photo'),
      guardian_id_photos_media_id: getFilePath('guardian_id_photos'),
      assessment_results_media_id: getFilePath('assessment_results'),
      admin_comment: null,
      admission_status: 'pending',
      grade9_mean_grade: data.grade9_mean_grade
    };
    const [result] = await pool.query(
      `INSERT INTO admission_applications SET ?`,
      [appData]
    );
    res.status(201).json({ id: result.insertId, ...appData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application', details: err.message });
  }
});

// PATCH endpoint to update application status/comment and send SMS
app.patch('/admission-applications/:id', async (req, res) => {
  const { id } = req.params;
  const { admission_status, admin_comment } = req.body;
  try {
    // Get the student's phone number
    const [[app]] = await pool.query('SELECT guardian_contact, full_name FROM admission_applications WHERE id = ?', [id]);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    // Update status/comment
    await pool.query(
      'UPDATE admission_applications SET admission_status = ?, admin_comment = ? WHERE id = ?',
      [admission_status, admin_comment, id]
    );
    // Compose SMS
    let message = `Dear Parent/Guardian, your application for ${app.full_name} has been reviewed.`;
    if (admission_status === 'approved') {
      message += ' Status: APPROVED. Congratulations!';
    } else if (admission_status === 'rejected') {
      message += ' Status: REJECTED. Please contact the school for details.';
    } else if (admin_comment) {
      message += ` More info needed: ${admin_comment}`;
    }
    // Send SMS
    if (app.guardian_contact && TWILIO_FROM) {
      await twilioClient.messages.create({
        body: message,
        from: TWILIO_FROM,
        to: app.guardian_contact
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update application or send SMS', details: err.message });
  }
});

// --- KJSEA Registrations ---
app.get('/k-jsea-registrations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM k_jsea_registrations');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations', details: err.message });
  }
});

app.post('/k-jsea-registrations', async (req, res) => {
  const { kjsea_number } = req.body;
  if (!kjsea_number) {
    return res.status(400).json({ error: 'kjsea_number is required' });
  }
  try {
    const [result] = await pool.query(
      `INSERT INTO k_jsea_registrations (kjsea_number) VALUES (?)`,
      [kjsea_number]
    );
    res.status(201).json({ id: result.insertId, kjsea_number });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'KJSEA number already exists' });
    } else {
      res.status(500).json({ error: 'Failed to add registration', details: err.message });
    }
  }
});

app.put('/k-jsea-registrations/:id', async (req, res) => {
  const { id } = req.params;
  const { kjsea_number } = req.body;
  if (!kjsea_number) {
    return res.status(400).json({ error: 'kjsea_number is required' });
  }
  try {
    const [result] = await pool.query(
      'UPDATE k_jsea_registrations SET kjsea_number = ? WHERE id = ?',
      [kjsea_number, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'KJSEA registration not found' });
    }
    res.json({ id, kjsea_number });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'KJSEA number already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update registration', details: err.message });
    }
  }
});

app.delete('/k-jsea-registrations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM k_jsea_registrations WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'KJSEA registration not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete KJSEA number', details: err.message });
  }
});

// --- Users ---
app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const data = req.body;
  const [result] = await pool.query(
    `INSERT INTO users SET ?`,
    [data]
  );
  res.json({ id: result.insertId, ...data });
});

// --- Media ---
app.get('/media', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM media');
  res.json(rows);
});

app.post('/media', async (req, res) => {
  const data = req.body;
  const [result] = await pool.query(
    `INSERT INTO media SET ?`,
    [data]
  );
  res.json({ id: result.insertId, ...data });
});

app.use('/uploads', express.static(uploadsDir));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 