const fs = require('fs').promises;
const path = require('path');
const AWS = require('aws-sdk');

const createBucketIfNotExists = async (s3, bucketName) => {
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
  } catch (error) {
    if (error.statusCode === 404) {
      // Bucket does not exist, create it
      await s3.createBucket({ Bucket: bucketName }).promise();
    } else {
      throw error;
    }
  }
};

const uploadFile = async () => {
  try {
    const s3 = new AWS.S3({
      endpoint: 'http://localhost:4566', // LocalStack endpoint
      s3ForcePathStyle: true, // Necessary for local development
      credentials: new AWS.Credentials({
        accessKeyId: 'dummy-access-key',
        secretAccessKey: 'dummy-secret-key',
      }),
    });

    const bucketName = 'my-local-bucket';
    const filePath = path.join(__dirname, 'file.txt');
    const fileContent = await fs.readFile(filePath);

    // Check if the bucket exists, create it if not
    await createBucketIfNotExists(s3, bucketName);

    const params = {
      Bucket: bucketName,
      Key: 'file.txt',
      Body: fileContent
    };

    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};

uploadFile();
