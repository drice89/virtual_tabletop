const AWS = require('aws-sdk');
const keys = require('./aws_keys');
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: keys.id,
  secretAccessKey: keys.secretKey
})

exports.uploadImage = (fileName, s3bucket) => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent
  }

  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    return data.location
  })
}
