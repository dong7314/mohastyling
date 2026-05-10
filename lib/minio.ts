import * as Minio from "minio";

const globalForMinio = globalThis as unknown as {
  minioClient: Minio.Client | undefined;
};

function getMinioClient(): Minio.Client {
  if (!globalForMinio.minioClient) {
    globalForMinio.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || "localhost",
      port: parseInt(process.env.MINIO_PORT || "9000"),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY || "",
      secretKey: process.env.MINIO_SECRET_KEY || "",
    });
  }
  return globalForMinio.minioClient;
}

const BUCKET = process.env.MINIO_BUCKET || "mohastyling";

async function ensureBucket(): Promise<void> {
  const client = getMinioClient();
  const exists = await client.bucketExists(BUCKET);
  if (!exists) {
    await client.makeBucket(BUCKET);
    await client.setBucketPolicy(
      BUCKET,
      JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${BUCKET}/*`],
          },
        ],
      })
    );
  }
}

export async function uploadImage(file: File): Promise<string> {
  await ensureBucket();

  const client = getMinioClient();
  const ext = file.name.split(".").pop();
  const fileName = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await client.putObject(BUCKET, fileName, buffer, file.size, {
    "Content-Type": file.type,
  });

  const endpoint = process.env.MINIO_ENDPOINT || "localhost";
  const port = process.env.MINIO_PORT || "9000";
  const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";

  return `${protocol}://${endpoint}:${port}/${BUCKET}/${fileName}`;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const client = getMinioClient();
  const url = new URL(imageUrl);
  const objectName = decodeURIComponent(url.pathname.slice(`/${BUCKET}/`.length));
  await client.removeObject(BUCKET, objectName);
}
