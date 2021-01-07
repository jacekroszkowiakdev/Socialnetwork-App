// server/ses.js

const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

exports.sendEmail = function (recipent, message, subject) {
    return ses.sendEmail({
        Source: " Jacek Roszkowiak <jacekroszkowiakdev@gmail.com>", // use the verified address !
        Destination: {
            ToAddresses: ["recipent", "jacekroszkowiakdev@gmail.com"],
        },
        Message: {
            Body: {
                Text: {
                    Data: message,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    }); // this is function that will send email on our behalf!
}
    .promise()
    .then(() => console.log("it worked!"))
    .catch((err) => console.log("err in ses.sendEmail: ", err));
