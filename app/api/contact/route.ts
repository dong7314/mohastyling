import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      console.error('Contact API env missing:', {
        hasResendApiKey: Boolean(resendApiKey),
        hasContactEmail: Boolean(contactEmail),
      });
      return NextResponse.json(
        { error: 'Contact email configuration is missing.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: `Moha Styling <noreply@mohastyling.com>`,
      to: contactEmail,
      ...(isEmail && { replyTo: email }),
      subject: `[Moha Styling] 새 문의 - ${name}`,
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:'Pretendard',sans-serif;color:#333;">
          <div style="background:#f9f9f9;padding:24px;border-radius:8px 8px 0 0;border-bottom:3px solid #e07a5f;">
            <h2 style="margin:0;color:#1a1a1a;font-size:20px;">새 문의가 도착했습니다</h2>
          </div>
          <div style="padding:24px;background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;font-weight:600;color:#666;width:80px;">이름</td>
                <td style="padding:12px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:600;color:#666;border-top:1px solid #f0f0f0;">연락처</td>
                <td style="padding:12px 0;border-top:1px solid #f0f0f0;">${email}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:600;color:#666;border-top:1px solid #f0f0f0;vertical-align:top;">메시지</td>
                <td style="padding:12px 0;border-top:1px solid #f0f0f0;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <p style="text-align:center;color:#999;font-size:12px;margin-top:16px;">
            Moha Styling 문의 폼을 통해 발송되었습니다.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: '메시지 전송에 실패했습니다.', detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: '메시지 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
}
