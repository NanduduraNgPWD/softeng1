const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like SendGrid, Outlook, etc.
  auth: {
    user: 'onthego8210@gmail.com', // Replace with your email
    pass: 'vacw cjim rcjl hgvj', // Replace with your email password or app-specific password
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'onthego8210@gmail.com',
      to,
      subject,
      html,
    });
    console.log('Email sent successfully');
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


module.exports = { sendEmail };
