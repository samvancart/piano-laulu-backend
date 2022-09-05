const express = require('express');
const app = express();

const cors = require('cors');
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
    const customer = req.body
    console.log(customer)
    res.json(customer)

});



const PORT = 8000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

