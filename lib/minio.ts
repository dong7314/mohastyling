import * as Minio from "minio";

const globalForMinio = globalThis as unknown as {
  minioClient: Minio.Client | undefined;
};

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getMinioConfig() {
  const port = Number.parseInt(requireEnv("MINIO_PORT"), 10);

  if (Number.isNaN(port)) {
    throw new Error("MINIO_PORT must be a number");
  }

  return {
    endPoint: requireEnv("MINIO_ENDPOINT"),
    port,
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: requireEnv("MINIO_ACCESS_KEY"),
    secretKey: requireEnv("MINIO_SECRET_KEY"),
    bucket: requireEnv("MINIO_BUCKET"),
  };
}

function getMinioClient(): Minio.Client {
  if (!globalForMinio.minioClient) {
    const config = getMinioConfig();

    globalForMinio.minioClient = new Minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    });
  }
  return globalForMinio.minioClient;
}

async function ensureBucket(): Promise<void> {
  const client = getMinioClient();
  const { bucket } = getMinioConfig();
  const exists = await client.bucketExists(bucket);
  if (!exists) {
    await client.makeBucket(bucket);
    await client.setBucketPolicy(
      bucket,
      JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucket}/*`],
          },
        ],
      })
    );
  }
}

export async function uploadImage(file: File): Promise<string> {
  await ensureBucket();

  const client = getMinioClient();
  const { bucket, endPoint, port, useSSL } = getMinioConfig();
  const ext = file.name.split(".").pop();
  const fileName = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await client.putObject(bucket, fileName, buffer, file.size, {
    "Content-Type": file.type,
  });

  const protocol = useSSL ? "https" : "http";

  return `${protocol}://${endPoint}:${port}/${bucket}/${fileName}`;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const client = getMinioClient();
  const { bucket } = getMinioConfig();
  const url = new URL(imageUrl);
  const objectName = decodeURIComponent(url.pathname.slice(`/${bucket}/`.length));
  await client.removeObject(bucket, objectName);
}
