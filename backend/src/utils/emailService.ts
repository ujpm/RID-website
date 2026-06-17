import nodemailer from 'nodemailer';

/**
 * Creates a reusable Nodemailer transporter using Zoho SMTP credentials
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports (like 587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends an HTML email
 * * @param to - The recipient's email address
 * @param subject - The subject line of the email
 * @param htmlContent - The HTML body of the email
 * @returns boolean indicating success or failure
 */
export const sendEmail = async (to: string, subject: string, htmlContent: string): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`Email sent successfully: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};