const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');


const signup = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Rizky Nafarel Sidiq", // Subject line
        text: "Email Rizky", // plain text body
        html: "Mantap Jiwa", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "Terima Email Rizky",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail */
const getbill = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth: { 
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "cerberus",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })
    
    let response = {
        body: {
            name : "Panjul",
            intro: "Beribu ribu ikan di Lautan mari mabar kawan",
            table : {
                data : [
                    {
                        item : "Mabar Yok",
                        description: "Capek di romwai terus",
                        price: "Rp 50.000",
                    } 
                ]
            },
            outro: "mabar banh plissssss"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}

module.exports ={
    signup,
    getbill
}