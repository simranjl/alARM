const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const expapp = express();
const s3Bucket = new aws.S3({
  accessKeyId: 'AKIARA2XBS3AN5CMRMHB',
  secretAccessKey: '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',
  region: 'US East (Ohio) us-east-2'
});

const upload = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: 'masspirgphotoupload',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|HEIC)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, Date.now().toString())
    }
  })
});

expapp.post('/upload', upload.single('image'), function (req, res) {
  res.json({ success: true, message: 'Image uploaded successfully.' });
});

expapp.listen(3000, function () {
  console.log('Server started on port 3000.');
});
