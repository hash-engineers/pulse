import nodemailer from 'nodemailer';
import env from '../env';

export const sendEmail = async (
  recipient: string,
  emailSubject: string,
  html: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com.',
    port: 587,
    secure: env.NODE_ENV === 'production',
    auth: {
      user: env.USER_EMAIL,
      pass: env.USER_PASS,
    },
  });

  await transporter.sendMail({
    from: env.USER_EMAIL,
    to: recipient,
    subject: emailSubject,
    html,
  });
};
