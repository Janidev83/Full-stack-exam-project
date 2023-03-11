const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();
const mockDB = require('./db/db');

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//* endpoints
app.post('/login', (req, res) => {
    console.log(req.method, req.url, req.body);
});

app.post('/registration', (req, res) => {
    console.log(req.method, req.url, req.body);
})

app.put('/update_account', (req, res) => {
    console.log(req.method, req.url, req.body);
})

app.get('/product', (req, res) => {
    mockDB.products.splice(6);
    res.status(200).json(mockDB.products);
})

//* server start
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})