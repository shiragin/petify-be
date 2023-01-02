const express = require('express');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const {
  getAllPets,
  createPet,
  getPet,
  updatePet,
  deletePet,
  getRandomPets,
  getPetsByUser,
} = require('../controllers/petsController');

const { auth } = require('../middleware/usersMiddleware');

const { getPictureUrl } = require('../middleware/petsMiddleware');

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

const router = express.Router();

router
  .route('/')
  .get(getAllPets)
  .post(auth, upload.single('picture'), getPictureUrl, createPet);

router.route('/random').get(getRandomPets);

router.route('/user/:id').get(auth, getPetsByUser);

router.route('/:id').get(getPet).patch(auth, updatePet).delete(auth, deletePet);

module.exports = router;
