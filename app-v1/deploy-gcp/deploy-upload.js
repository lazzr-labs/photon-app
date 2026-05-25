import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import { bucket, folderPath } from './deploy-env.js';

const fileStorageUpload = async (fileStream, filePathStorage) => {
  try {
    const fileStorage = bucket.file(filePathStorage);

    let metadata = {
      contentEncoding: 'gzip',
      cacheControl: 'max-age=300, public',
    };

    if (path.extname(filePathStorage) === '') {
      metadata.contentType = 'text/html';
    }
    if (filePathStorage === 'index.html') {
      metadata = {
        contentEncoding: 'gzip',
        cacheControl: 'max-age=30, public',
      };
    }

    const writeStream = fileStorage.createWriteStream({
      metadata: metadata,
    });
    fileStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', async () => {
        try {
          const [fileMetadata] = await fileStorage.getMetadata();
          resolve(fileMetadata.mediaLink);
        }
        catch (err) {
          reject(err);
        }
      });
      writeStream.on('error', reject);
    });
  }
  catch (error) {
    console.error('Error during upload:', error);
    throw new Error(error.message);
  }
};

const fileGzipUpload = async (filePathLocal, filePathStorage) => {
  const gzip = zlib.createGzip();
  const fileSource = fs.createReadStream(filePathLocal);
  const fileStream = fileSource.pipe(gzip);
  try {
    const mediaLink = await fileStorageUpload(fileStream, filePathStorage);
    console.log('File uploaded successfully:', mediaLink);
  }
  catch (error) {
    console.error('Error uploading file:', error);
  }
};

const uploadFoldersFiles = async (folderPath, relativePath) => {
  try {
    const files = await fs.promises.readdir(folderPath);
    for (const file of files) {
      const filePathLocal = path.join(folderPath, file);
      const filePathStorage = path.join(relativePath, file);
      const fileStat = await fs.promises.stat(filePathLocal);
      if (fileStat.isFile()) {
        await fileGzipUpload(filePathLocal, filePathStorage);
      } else if (fileStat.isDirectory()) {
        await uploadFoldersFiles(filePathLocal, filePathStorage);
      }
    }
  }
  catch (error) {
    console.error('Error reading folders and files:', error);
  }
};

uploadFoldersFiles(folderPath, '');
