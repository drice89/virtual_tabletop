const AWS = require('aws-sdk');
const keys = require('./aws_keys');
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: keys.id,
  secretAccessKey: keys.secretKey
})


// exports.upload = function (req, res) {
//   var file = req.files.file;
//   fs.readFile(file.path, function (err, data) {
//     if (err) throw err; // Something went wrong!
//     var s3bucket = new AWS.S3({
//       params: {
//         Bucket: 'mybucketname'
//       }
//     });

//     s3bucket.upload(params, function (err, data) {
//       // Whether there is an error or not, delete the temp file
//       fs.unlink(file.path, function (err) {
//         if (err) {
//           console.error(err);
//         }
//         console.log('Temp File Delete');
//       });

//       console.log("PRINT FILE:", file);
//       if (err) {
//         console.log('ERROR MSG: ', err);
//         res.status(500).send(err);
//       } else {
//         console.log('Successfully uploaded data');
//         res.status(200).end();
//       }
//     });
//   });
// };



















exports.uploadImage = (fileName, s3bucket) => {
  // console.log(fileName)
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: s3bucket,
    Key: fileName,
    Body: fileContent
  }
 
  return s3UploadPromise = new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      } else {
        // console.log(data)
        resolve(data.Location)

      }
    })



    // s3.upload(params, function (err, data) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(data);
    //   }
    // });
  });
}


