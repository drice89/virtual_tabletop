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



//For image upload that hits our server first
// exports.uploadImage = (fileName, s3bucket) => {
//   // console.log(fileName)
//   const fileContent = fs.readFileSync(fileName);
//   const params = {
//     Bucket: s3bucket,
//     Key: fileName,
//     Body: fileContent
//   }
 
//   return s3UploadPromise = new Promise(function (resolve, reject) {
//     s3.upload(params, function (err, data) {
//       if (err) {
//         throw err;
//       } else {
//         // console.log(data)
//         resolve(data.Location)

//       }
//     })

//   });
// }


