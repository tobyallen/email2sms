const sgMail = require('@sendgrid/mail');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports = (req, res) => {

    //Specify API Key for Sendgrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    //Set from address as <number>@EMAIL_DOMAIN
    const fromAddress = req.query.From.replace("+", "") + `@${process.env.EMAIL_DOMAIN}`;

    //Create Email
    const email = {
        to: process.env.TO_EMAIL_ADDRESS,
        from: fromAddress,
        subject: `New SMS message from: ${req.query.From}`,
        text: req.query.Body,
    };

    // Send the email
    sgResp = sgMail.send(email)
        .then(response => {
            let twiml = new MessagingResponse();
            res.status(200).send(twiml); //Make sure we return correctly.
        })
};