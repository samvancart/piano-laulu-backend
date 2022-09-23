const express = require('express');
const app = express();

require('dotenv').config()

const nodemailer = require('nodemailer');

const cors = require('cors');
const { json } = require('express');
app.use(cors());

app.use(express.json());

let customers = [
    {
        name: 'Uuno Turhapuro',
        email: 'uuno@turhapuro.fi',
        phone: '0700123123',
        info: 'Uuno musaa!!'
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Piano-laulu-backend</h1>');
});

app.get('/api/customers', (req, res) => {
    res.json(customers);
});

app.post('/api/send', (req, res) => {
    const customer = req.body;
    console.log(customer);

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'info@keikat.fi',
        to: 'keikat.testi@gmail.com',
        subject: 'Keikka',
        text: `Nimi: ${customer.name}
            Sähköposti: ${customer.email}
            Puhelin: ${customer.phone}
            Viesti: ${customer.info}`
    };
    transporter.sendMail(mailOptions, (error, information) =>{
        if(error){
            console.log(error);
            res.send('error');
        } else {
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(information));
            // console.log('Email sent: ' + information.response)
            res.send('success')
        }
    });

    res.json(customer);

});



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

