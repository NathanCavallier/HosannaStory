const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection string not found");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerName = "your-container-name";

const uploadFile = async (filePath, blobName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const downloadFile = async (blobName, downloadFilePath) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const downloadBlockBlobResponse = await blockBlobClient.downloadToFile(
      downloadFilePath
    );
    console.log(
      `Downloaded blob ${blobName} successfully`,
      downloadBlockBlobResponse.requestId
    );
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

const deleteFile = async (blobName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const deleteBlockBlobResponse = await blockBlobClient.delete();
    console.log(
      `Deleted blob ${blobName} successfully`,
      deleteBlockBlobResponse.requestId
    );
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
};
