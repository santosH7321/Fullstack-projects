import nodemailer from 'nodemailer';
import ErrorResponse from './errorResponse.js';


const sendEmail = async (options) => {
  try {
    let transporter;
    
    if (process.env.NODE_ENV === 'production') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USERNAME,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: process.env.OAUTH_ACCESS_TOKEN,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    } else {
      if (process.env.EMAIL_HOST === 'smtp.ethereal.email') {
        const testAccount = await nodemailer.createTestAccount();
        
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass
          }
        });
      } else {
        transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: process.env.EMAIL_PORT == 465, 
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          }
        });
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"E-Commerce App" <noreply@ecommerce.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #4F46E5; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0; 
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 1px solid #eee; 
              text-align: center; 
              color: #666; 
              font-size: 12px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>E-Commerce Store</h1>
            </div>
            <div class="content">
              ${options.html || options.message.replace(/\n/g, '<br>')}
              <br><br>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
              <p>This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV !== 'production' && process.env.EMAIL_HOST === 'smtp.ethereal.email') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new ErrorResponse('Email could not be sent', 500);
  }
};

module.exports = sendEmail;