import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-southeast-1", //enter your region
  credentials: {
    accessKeyId: process.env.AWSS3_ACCESS_KEY,
    secretAccessKey: process.env.AWSS3_SECRET_KEY,
  },
});

interface IUploadFile {
  Body: Blob;
  Key: string;
  ContentType: string;
  Dir: string;
}

export async function uploadFile({ Body, Key, ContentType, Dir }: IUploadFile) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: "bucketname", //enter your bucket name
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
