const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config()

app.post('/send-email', async (req, res) => {
    console.log(process.env.mailuser);
    
  const { name, email, subject, message, mailTo } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mailuser,
      pass: process.env.mailpass,  
    },
  });

  const mailOptions = {
    from: email, 
    to: mailTo, 
    subject: subject || 'No Subject', 
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.get("/",(req,res)=>{
    res.json({working:true})
})

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
