
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});


const sendWelcomeEmail = (email, name)=>{
    const data = {
        from: 'Your task manager app <alecbarba@sandbox6e2816c2d71f4be58a3787f91e015ab0.mailgun.org>',
        to: email,
        subject: 'Hello, welcome to our application!',
        text: `Welcome, ${name}. Let me know how you get along with the app.`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            return console.log('Error:',error);
        }
        console.log(body)
    });
}

const sendCancelationEmail = (email, name)=>{
    const data = {
        from: 'Your task manager app <alecbarba@sandbox6e2816c2d71f4be58a3787f91e015ab0.mailgun.org>',
        to: email,
        subject: 'Cancelation completed.',
        text: `Goodbye, ${name}. It makes us really sad that you decided to go. Would you be so nice to answer why? Help us make a better service`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            return console.log('Error:',error);
        }
        console.log("mail will be sent!")
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}