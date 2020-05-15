const AWS = require('aws-sdk');
const keys = require('./aws_keys');
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: keys.id,
  secretAccessKey: keys.secretKey
})

exports.uploadImage = (fileName, s3bucket) => {
  debugger
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: s3bucket,
    Key: fileName,
    Body: fileContent
  }

  return s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(data.location)
    return data.location
  })
}
