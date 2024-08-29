import env from '../env';
import nodemailer from 'nodemailer';

type SendEmail = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async ({ to, subject, html }: SendEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: env.NODE_ENV === 'production',
    auth: {
      user: env.USER_EMAIL,
      pass: env.USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: env.USER_EMAIL,
    to,
    subject,
    html,
  });
};

export default sendEmail;
