const AWS = require('aws-sdk');

const uploadToS3 = async (data, fileName) => {
    var BUCKET_NAME = process.env.BUCKET_NAME;
    var IAM_USER_KEY = process.env.IAM_USER_KEY;
    var IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: "public-read",
    }

    return new Promise((resolve, resject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log("Something went wrong", err);
                resject(err);
            } else {
                console.log("seccessfull", s3response);
                resolve(s3response.Location)
                return s3response.Location;
            }
        })
    })

}

module.exports = {
    uploadToS3
};