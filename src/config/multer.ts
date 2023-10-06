import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const middlePath = path.join(__dirname, '/pictures');
    cb(null, middlePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        file.originalname.substring(file.originalname.indexOf('.')),
    );
  },
});

const uploadFile = multer({
  storage: storage,
});

export default uploadFile;
