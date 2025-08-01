import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ from, to, subject, text }: { from: string, to: string, subject: string, text: string }) => {
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
