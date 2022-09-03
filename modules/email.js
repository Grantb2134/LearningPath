const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const getPasswordResetURL = (user, token) => `http://localhost:3030/auth/reset/${user.id}/${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = 'LearningPath Password Reset Request';
  const html = `
  <p>Hello ${user.id || user.email},</p>
  <p>We heard that you lost your LearningPath password. Sorry about that!</p>
  <p>Please following the link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>Link will expire in 1 hour.</p>
  <p>–Your friends at LearningPath</p>
  `;
  return {
    from, to, subject, html,
  };
};

module.exports = { transporter, getPasswordResetURL, resetPasswordTemplate };
