const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();
const mockDB = require('./db/db');

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//* endpoints
// Később kitalálni, bemegy-e a customer végponthoz vagy önállóan működik
app.post('/login', (req, res) => {
    console.log(req.method, req.url, req.body);
});

app.post('/registration', (req, res) => {
    console.log(req.method, req.url, req.body);
})

app.use('/customer', require('./controller/customer.controller'));

app.get('/product', (req, res) => {
    const firstPage = mockDB.products.slice(0, 6);
    res.status(200).json(firstPage);
})

app.use('/order', require('./controller/order.controller'));

//* wrong url
app.use((req, res) => {
    res.send('Page not found!');
})

//* server start
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

//* error