import env from '../env';
import nodemailer from 'nodemailer';
import ApiError from '../errors/api-error';

type SendMail = {
  to: string | string[];
  subject: string;
  body: string;
};

const sendMail = async ({ to, subject, body }: SendMail): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: env.NODE_ENV === 'production',
    auth: {
      user: env.USER_EMAIL,
      pass: env.USER_PASSWORD,
    },
  });

  await transporter.sendMail(
    {
      from: env.USER_EMAIL,
      to,
      subject,
      html: body,
    },
    error => {
      if (error)
        throw new ApiError(500, error.message + '!' || 'Error from send mail!');
    },
  );
};

export default sendMail;
