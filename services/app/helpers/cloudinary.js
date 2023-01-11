const cloudinary = require("../middlewares/cloudinary");

class Cloudinary {
  static async upload(content) {
    try {
      const image = await cloudinary.uploader.upload(content);
      return image;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Cloudinary;
