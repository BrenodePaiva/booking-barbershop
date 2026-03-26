import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const client = new S3Client();
export const uploadImage = async (
  file: File,
  id: string,
  folder: string,
): Promise<string> => {
  //convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  //upload image to s3
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ACL: "public-read",
    Key: `${folder}/${id}`,
    Body: buffer,
    ContentType: file.type,
  });

  await client.send(command);

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${id}`;
};

export const deleteImage = async (
  id: string,
  folder: string,
): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${id}`,
  });
  await client.send(command);
};
