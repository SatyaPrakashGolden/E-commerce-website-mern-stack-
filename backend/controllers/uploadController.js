const uploadController = require("express").Router();
const multer = require("multer");
const verifyToken = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  // You can add more validation and file type restrictions here
});

uploadController.post("/firstImg",  upload.single("firstImg"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    return res.status(200).json({ msg: "File uploaded successfully", fileName: req.file.filename });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// Handle file upload for the second image
uploadController.post("/secondImg",  upload.single("secondImg"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    return res.status(200).json({ msg: "File uploaded successfully", fileName: req.file.filename });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = uploadController;
