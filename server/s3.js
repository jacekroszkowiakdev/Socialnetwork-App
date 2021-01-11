const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

//creating an instance with our secrets:
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

// filename - is  the filename after uid
// mimetype - jpg, png etc;
// size
// path
module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "jacekroszkobucket",
            ACL: "public-read", // states that people can view this file publicly
            Key: filename,
            Body: fs.createReadStream(path), // specify path to where the files are stored/ upload
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise(); // this makes it return a promise

    promise
        .then(() => {
            // it worked!!!
            console.log("amazon upload complete");
            next();
            // OPTIONAL - to delete the file, 2nd argument is "no op function", it is just fullfiling the requirements of unlink:
            fs.unlink(path, () => {}); // "empty" function --> noop function (no operation)
        })
        .catch((err) => {
            console.log("upload to S3 failed: ", err);
            res.sendStatus(404);
        });
};
