const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { response } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.get("/", () => {
//   resizeBy.send("welcome to my form");
// });

app.post("/api/form", (req, res) => {
  //res.send("msg sent");
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "hosremail@gmail.com",
      pass: "passwordHere",
    },
  });

  let mailOptions = {
    // from: data.email,
    to: data.email,
    subject: data.subject,
    html: `

         <h3>Message</h3>
         <p>${data.message}</p>

        `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("success");
    }
  });

  smtpTransport.close();
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`server starting at port ${PORT}`);
});
