import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    // Simple auth check
    const adminId = process.env.ADMIN_ID || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    const expectedAuth = `Basic ${btoa(`${adminId}:${adminPassword}`)}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // TODO: Implement MinIO upload
    // For now, return a placeholder
    const fileName = `${Date.now()}-${file.name}`;
    const url = `/uploads/${fileName}`;

    // Example with MinIO:
    // import { Client } from 'minio';
    // const minioClient = new Client({
    //   endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    //   port: parseInt(process.env.MINIO_PORT || '9000'),
    //   useSSL: process.env.MINIO_USE_SSL === 'true',
    //   accessKey: process.env.MINIO_ACCESS_KEY!,
    //   secretKey: process.env.MINIO_SECRET_KEY!,
    // });
    // const buffer = await file.arrayBuffer();
    // await minioClient.putObject(
    //   process.env.MINIO_BUCKET!,
    //   fileName,
    //   Buffer.from(buffer)
    // );

    return NextResponse.json({ url, fileName });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
