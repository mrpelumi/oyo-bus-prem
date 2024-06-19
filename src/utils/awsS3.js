import {S3Client, S3} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';

export const handleS3Upload = async (name, file, currentPath="") => {
  try {
        const parallelUploads3 = new Upload({
        client: new S3Client({
          region: "eu-west-2",
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
          }
        }),
        params: String(currentPath) === "/app/tax/business" ? { Bucket:"businesspremises.cloud", Key:name, Body:file }:{Bucket:"businessreceipt.cloud", Key:name, Body:file},
        leavePartsOnError: false,
      });
    
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log("completed");
      });
    
      await parallelUploads3.done();
    } catch (e) {
      console.log(e);
  }
}