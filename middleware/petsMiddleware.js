const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'doqx2hnzh',
  api_key: '833573428459323',
  api_secret: 'ApkBEbGoAmeW1rCTMdNontQMQhc',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()} -${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

function getPictureUrl(req, res, next) {
  if (req.file) {
    req.body.picture = req.file.path;
  }
  next();
}

module.exports = { getPictureUrl, upload };
