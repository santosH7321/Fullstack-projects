import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASS'],
  },
})

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  await transporter.sendMail({
    from: `"Health Tracker" <${process.env['EMAIL_USER']}>`,
    to,
    subject,
    text,
  })
}
