
const express = require("express");
const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const router = express.Router();
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const sharp = require("sharp");



const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 2,
    fields: 1,
    parts: 3
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }

    cb(null, true);
  }
});

router.post(
  "/tryon",
  upload.fields([
    { name: "person_image", maxCount: 1 },
    { name: "garment_image", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { category } = req.body;

      if (!["tops", "bottoms", "one-pieces"].includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid garment category"
        });
      }

      const personImage = req.files?.person_image?.[0];
      const garmentImage = req.files?.garment_image?.[0];

      if (!personImage || !garmentImage) {
        return res.status(400).json({
          success: false,
          message: "Both images are required"
        });
      }

      const { fileTypeFromBuffer } = await import("file-type");

      const personType = await fileTypeFromBuffer(personImage.buffer);
      const garmentType = await fileTypeFromBuffer(garmentImage.buffer);

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

    if (
      !personType ||
      !garmentType ||
      !allowedTypes.includes(personType.mime) ||
      !allowedTypes.includes(garmentType.mime)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid image file. Only genuine JPG, PNG and WEBP images are allowed."
      });
    }

    const MAX_IMAGE_PIXELS = 25_000_000;

    const personMetadata = await sharp(personImage.buffer).metadata();
    const garmentMetadata = await sharp(garmentImage.buffer).metadata();

      if (
        !personMetadata.width ||
        !personMetadata.height ||
        !garmentMetadata.width ||
        !garmentMetadata.height ||
        personMetadata.width * personMetadata.height > MAX_IMAGE_PIXELS ||
        garmentMetadata.width * garmentMetadata.height > MAX_IMAGE_PIXELS
      ) {
        return res.status(400).json({
          success: false,
          message: "Image dimensions are too large. Please upload smaller images."
        });
      }


      if (!process.env.AI_SERVICE_URL || !process.env.WEARWISE_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "AI service configuration is missing"
        });
      }

      const formData = new FormData();

      formData.append("person_image", personImage.buffer, {
        filename: "person_image",
        contentType: personType.mime
      });

      formData.append("garment_image", garmentImage.buffer, {
        filename: "garment_image",
        contentType: garmentType.mime
      });

      formData.append("category", category);

      const response = await axios.post(
        `${process.env.AI_SERVICE_URL}/tryon`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            "x-api-key": process.env.WEARWISE_API_KEY,
            "ngrok-skip-browser-warning": "true"
          },
          responseType: "arraybuffer",
          timeout: 600000,
          maxContentLength: 20 * 1024 * 1024,
          maxBodyLength: 25 * 1024 * 1024
        }
      );

      if (
      !response.headers["content-type"]?.startsWith("image/png")
    ) {
      return res.status(502).json({
        success: false,
        message: "AI service returned an invalid image response."
      });
    }

    const outputBuffer = Buffer.from(response.data);

    const outputType = await fileTypeFromBuffer(outputBuffer);

    if (outputType?.mime !== "image/png") {
      return res.status(502).json({
        success: false,
        message: "AI service returned an invalid image."
      });
    }

      res.set("Content-Type", "image/png");
      res.set("Cache-Control", "no-store");
      res.send(outputBuffer);

    } catch (error) {
      console.error("AI Try-On Error:", error.message);

      const statusCode = error.code === "ECONNABORTED" ? 504 : 502;

      res.status(statusCode).json({
        success: false,
        message: error.code === "ECONNABORTED"
          ? "Virtual try-on timed out. Please try again."
          : "Virtual try-on service is temporarily unavailable."
      });
    }
  }
);



// Handle image upload errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.code === "LIMIT_FILE_SIZE"
        ? "Each image must be under 10MB"
        : "Invalid image upload"
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Image upload failed"
    });
  }

  next();
});

module.exports = router;
