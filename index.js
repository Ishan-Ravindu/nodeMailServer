const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { response } = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', () => {
    resizeBy.send('welcome to my form')
})

app.post('/api/form', (req, res) => {
    //res.send("msg sent");
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'mobiledevelopment2021@gmail.com',
            pass: 'mit@2021'
        }
    });

    let mailOptions = {
        from: data.email,
        to: 'amilasiriwardhana660@gmail.com',
        subject: `Message from ${data.name}`,
        html: `

        <h3>Informations</h3>
         <ul>
         <li>Name: ${data.name}</li>
         <li>LastName:${data.lastName}</li>
         <li>Email:${data.email}</li>
         </ul>

         <h3>Message</h3>
         <p>${data.message}</p>

        `
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {

        if (error) {
            res.send(error)
        } else {
            res.send('success')
        }
    })

    smtpTransport.close();
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`server starting at port ${PORT}`);
})