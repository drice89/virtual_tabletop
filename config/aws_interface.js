const AWS = require('aws-sdk');
const keys = require('./aws_keys');
const multer = require('multer');
const multerS3 = require('multer-s3')


const s3 = new AWS.S3({
  accessKeyId: keys.id,
  secretAccessKey: keys.secretKey
})

 exports.uploadBoardImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vtboardimages',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

exports.uploadPieceImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vttokenimages',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

