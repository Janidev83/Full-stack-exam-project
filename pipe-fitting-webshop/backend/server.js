const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());

app.use(express.static('public'));

//* endpoints
app.post('/login', (req, res) => {
    console.log(req.body);
});

app.post('/registration', (req, res) => {
    console.log(req.body);
})

app.put('/update_account', (req, res) => {
    console.log(req.body);
})

//* server start
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})