const AWS = require('aws-sdk');
const S3Config = require('config').aws.s3;


module.exports = {

  getFileHash: function(file, callback){

  }

  uploadImageToS3: function(file, type, callback){
    let fileHash = getFileHash(file);

    let key = path.join(
      S3Config.img.path,
      'MOS-' + fileHash + '.' + type
    );

    let bucket = new AWS.S3({
      params: {
        Bucket: S3Config.bucket
      }
    });

    let params = {
      ACL: 'public-read',
      Key: key,
      Body: fs.createReadStream(file),
    };
    bucket.upload(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        let imageUrl = S3Config.publicUrl + '/' + key;
        callback(null, imageUrl);
      }
    });
  }
}