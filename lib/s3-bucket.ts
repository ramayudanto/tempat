import { S3Client, PutObjectCommand, ObjectCannedACL, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Set up the client for DigitalOcean Spaces
export const s3 = new S3Client({
  region: "sgp1",
  endpoint: "https://sgp1.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_SPACES_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SPACES_SECRET!,
  },
});

export async function getUrl(imageFile: File, place_id: string) {
  if (!imageFile) {
    return null;
  }
  const key = `resto/${place_id}/rating/${uuidv4()}-${imageFile.name}`;

  // Upload the file to DigitalOcean Spaces with content type auto-detection and public-read ACL
  const params = {
    Bucket: process.env.NEXT_PUBLIC_SPACES_BUCKET_NAME!,
    Key: key,
    Body: imageFile,
    ContentType: imageFile.type,
    ACL: ObjectCannedACL.public_read,
  };
  try {
    await s3.send(new PutObjectCommand(params));

    // Get the public URL for the uploaded file
    const imageUrl = `https://${process.env.NEXT_PUBLIC_SPACES_BUCKET_NAME!}.sgp1.digitaloceanspaces.com/${key}`;

    return imageUrl;
  } catch (e) {
    console.log(`Error uploading file: ${e}`);
    return e;
  }
}

export async function getPictures(place_id: string) {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_SPACES_BUCKET_NAME,
    Prefix: `${place_id}/rating/`, // List all files in the directory "place_id/rating"
  };

  try {
    const data = await s3.send(new ListObjectsV2Command(params));

    // Extract file information from the response
    const pictures = data.Contents?.map((file: any) => {
      return `https://${process.env.NEXT_PUBLIC_SPACES_BUCKET_NAME}.sgp1.digitaloceanspaces.com/${file.Key}`;
    });

    return pictures;
  } catch (e) {
    console.error(`Error listing files: ${e}`);
    return e;
  }
}
