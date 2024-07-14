import * as nodemailer from 'nodemailer';

const SMTP_HOST = '*********';
const SMTP_PORT = 587;
const SMTP_USER = '*********';
const SMTP_PASS = '*********';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default transporter;