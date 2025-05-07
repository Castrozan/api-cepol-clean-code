import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

interface R2Config {
  region: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

const getR2Config = (c: any): R2Config => {
  const config = {
    region: c.env.CLOUDFLARE_R2_REGION || '',
    endpoint: c.env.CLOUDFLARE_R2_ENDPOINT || '',
    accessKeyId: c.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: c.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
    bucketName: c.env.CLOUDFLARE_R2_BUCKET_NAME || '',
  };

  const missingEnvVars = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  }

  return config as R2Config;
};

let s3Client: S3Client | null = null;

const getS3Client = async (config: R2Config): Promise<S3Client> => {
  if (!s3Client) {
    if (!config.accessKeyId || !config.secretAccessKey) {
      throw new Error("Missing required AWS credentials");
    }

    s3Client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      retryMode: 'standard',
    });
  }
  return s3Client;
};

export const uploadImage = async (file: File, c: any, fileName?: string): Promise<string> => {
  if (!file || !(file instanceof File)) {
    throw new Error("Invalid file: Must be a File object");
  }

  const nameToUse = fileName || file.name || 'unnamed';
  const extension = nameToUse.split('.').pop();
  const baseName = nameToUse.replace(/\.[^/.]+$/, "");
  const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  const uniqueKey = `${sanitizedBaseName}-${crypto.randomUUID()}.${extension}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const config = getR2Config(c);

    const params = {
      Bucket: config.bucketName,
      Key: uniqueKey,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    };
    
    const s3 = await getS3Client(config);
    await s3.send(new PutObjectCommand(params));

    const url = new URL(`https://image.cepol.com.br/${uniqueKey}`);
    return url.toString();
  } catch (error) {
    console.error("Error uploading to R2:", error instanceof Error ? error.message : String(error));
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const removeImage = async (key: string, c: any): Promise<void> => {
  if (!key || typeof key !== 'string') {
    throw new Error("Invalid key: Must be a non-empty string");
  }

  try {
    const config = getR2Config(c);
    const s3 = await getS3Client(config);

    const params = {
      Bucket: config.bucketName,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(params));

  } catch (error) {
    console.error("Error deleting from R2:", error instanceof Error ? error.message : String(error));
    throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const removeImageByUrl = async (url: string, c: any): Promise<void> => {
  const urlObj = new URL(url);
  if (urlObj.hostname !== 'image.cepol.com.br') {
    throw new Error("Invalid URL: must be from image.cepol.com.br");
  }
  const key = urlObj.pathname.slice(1);
  await removeImage(key, c);
};