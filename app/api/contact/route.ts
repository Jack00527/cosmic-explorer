import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[\s@]+@[\s@]+\.[\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    await sendEmail({
      from: 'onboarding@resend.dev', // This needs to be a verified domain in Resend
      to: 'pranay@kmrb.tech',
      subject: `New message from ${name}`,
      text: `From: ${email}\n\n${message}`,
    });
    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
