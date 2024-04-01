const asyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../model/EmailMsg/EmailMessaging.js");
const Filter = require("bad-words");
sgMail.setApiKey(process.env.APP_SENDGRIP_API_KEY);

const sendEmailMsgCtrl = asyncHandler(async (req, res) => {
  const { to, subject, message, recipientEmail } = req.body;
  const user = req?.user;

  //get the message
  const emailMessage = subject + " " + message;

  //prevent bad words
  const filter = new Filter();
  const isProfane = fliter.isProfane(emailMessage);

  console.log(isProfane);

  if(user?.isBlocked){
    throw new Error("You are blocked and cannot send more messages");
  }

  try {
    const messageAndEmail = `New Message from: ${recipientEmail},Message: ${message}`;

    if(isProfane){
        throw new Error("Email failed to send! Cannot use profane word!");
    }

    //build up the email object
    const msg = {
      to: "sohammaha15@gmail.com",
      subject: subject,
      text: messageAndEmail,
      from: "sohammaha15@gmail.com"
    }

    //send the email
    await sgMail.send(msg);

    //save to our database
    const emailMsg = await EmailMsg.create({
      sendBy: user?._id,
      fromEmail: user?.email,
      toEmail: to,
      message: message,
      subject: subject,
      recipientEmail: recipientEmail
    });

    res.status(201).json("Email Send");

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {sendEmailMsgCtrl};
