import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // TODO: Implement email sending
    // Options: Resend, SendGrid, Nodemailer, etc.
    // For now, just log the data
    console.log('Contact form submission:', { name, email, message });

    // Example with Resend (uncomment and configure):
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.CONTACT_EMAIL!,
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `새 문의: ${name}`,
    //   html: `...`,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: '메시지 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
}
