const express = require('express');
require('dotenv').config();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form submission route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'nishanthnd63@outlook.com', // Replace with your recipient email
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}
Email: ${email}
Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Basic API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});