import nodemailer from 'nodemailer';

export const sendEmail = async (email, title, body) => {
  try {
    // make transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // send email
    const info = await transporter.sendMail({
      from: "Coding School <coding.school@example.com>",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    
    return info;
  }
  catch (error) {
    console.error('Error sending email:', error);
  }
};