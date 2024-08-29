import env from '../env';
import nodemailer from 'nodemailer';
import ApiError from '../errors/api-error';

type SendMail = {
  to: string;
  subject: string;
  html: string;
};

const sendMail = ({ to, subject, html }: SendMail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: env.NODE_ENV === 'production',
    auth: {
      user: env.USER_EMAIL,
      pass: env.USER_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: env.USER_EMAIL,
      to,
      subject,
      html,
    },
    (error, res) => {
      if (error)
        throw new ApiError(500, error.message + '!' || 'Error from send mail!');

      if (res) console.log('Sent ->', res.accepted);
    },
  );
};

export default sendMail;
