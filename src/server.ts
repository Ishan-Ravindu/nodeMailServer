import express from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import transporter from './util/send_mail';
import createEmail from './util/create-mail';
import saveMail from './util/save-mail';

const app = express();
const PORT = process.env.PORT || 3000;
const SAVE_DIR = path.join(__dirname, 'received_emails');

if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true });
}

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  try {
    const { from, to, subject, text, html } = req.body;

    if (!from || !to || !subject || (!text && !html)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailContent = createEmail(from, to, subject, text, html);
    saveMail(SAVE_DIR,emailContent);

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email forwarded to ${to}`);

    res.status(200).json({ message: 'Email saved and forwarded successfully' });
  } catch (error) {
    console.error('Error processing email:', error);
    res.status(500).json({ error: 'Error processing email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});