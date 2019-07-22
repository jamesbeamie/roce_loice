const multer = require('multer');

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ imgStorage });

module.exports = upload;
