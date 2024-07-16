const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "techshop",
  },
});

const uploadCloud = multer({ storage });

let deleteFilesInFolder = async (folderPath) => {
  try {
    // Lấy danh sách các tệp trong thư mục
    const { resources } = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 100, // Số lượng tối đa tệp cần lấy (tối đa là 100)
    });
    // Lặp qua từng tệp và xóa chúng
    for (let i = 0; i < resources.length; i++) {
      const public_id = resources[i].public_id;
      await cloudinary.uploader.destroy(public_id);
      console.log(`Deleted file: ${public_id}`);
    }
    console.log(`All files in folder '${folderPath}' have been deleted.`);
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};

module.exports = {
  uploadCloud,
  deleteFilesInFolder,
};
