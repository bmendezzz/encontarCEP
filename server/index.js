const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-email', async (req, res) => {
  const { email, address } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Dados do CEP ${address.cep}`,
    html: `
      <h2>Informações do CEP ${address.cep}</h2>
      <p><strong>Logradouro:</strong> ${address.logradouro}</p>
      <p><strong>Bairro:</strong> ${address.bairro}</p>
      <p><strong>Cidade:</strong> ${address.localidade}</p>
      <p><strong>Estado:</strong> ${address.uf}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});