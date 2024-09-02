const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const router = express.Router();
require("dotenv").config();
const HouseCard = require("../models/HouseCard");

// Check and create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to store files temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadHouse", upload.array("images", 10), async (req, res) => {
  try {
    const {
      title,
      price,
      currency,
      floors,
      rooms,
      bedrooms,
      area,
      street,
      location,
      houseId,
      date,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imageUrls = [];

    // Allowed formats
    const allowedFormats = ["jpg", "jpeg", "png", "webp"];

    // Upload each file to Cloudinary
    for (const file of req.files) {
      console.log("Uploading file:", file.path); // Log the file path

      // Check if the file exists before attempting to upload
      if (!fs.existsSync(file.path)) {
        console.error(`File does not exist: ${file.path}`);
        continue; // Skip this file and continue with the next
      }

      // Determine file format
      const format = path.extname(file.originalname).slice(1).toLowerCase();

      // Validate file format
      if (!allowedFormats.includes(format)) {
        console.error(`Invalid file format: ${format}`);
        fs.unlinkSync(file.path); // Remove invalid file
        continue;
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
        public_id: path.parse(file.originalname).name,
        format: format, // Explicitly set the format based on file extension
      });
      imageUrls.push(result.secure_url);

      // Delete the local file after uploading to Cloudinary
      fs.unlinkSync(file.path);
    }

    if (houseId) {
      const houseCard = await HouseCard.findById(houseId);
      if (!houseCard) {
        return res.status(404).json({ message: "House card not found" });
      }
      houseCard.images.push(...imageUrls);
      await houseCard.save();
      res
        .status(200)
        .json({
          message: "House updated successfully",
          images: houseCard.images,
        });
    } else {
      const newHouseCard = new HouseCard({
        images: imageUrls,
        title,
        price,
        currency,
        floors,
        rooms,
        bedrooms,
        area,
        street,
        location,
        date,
      });
      await newHouseCard.save();
      res.status(200).json({ message: "House uploaded successfully" });
    }
  } catch (error) {
    console.error("Error uploading house:", error);
    res.status(500).json({ message: "Error uploading house" });
  }
});

router.post("/loadPosts", async (req, res) => {
  try {
    // Fetch all documents from the HouseCard collection
    const loadCards = await HouseCard.find({});

    // Send a successful response with the fetched documents
    res.status(200).json({
      message: "Successfully sent cards data",
      loadCards,
    });
  } catch (err) {
    // Handle any errors that occurred during the fetch operation
    res.status(500).json({
      message: "Error while sending cards data",
      error: err.message,
    });
  }
});

module.exports = router;
