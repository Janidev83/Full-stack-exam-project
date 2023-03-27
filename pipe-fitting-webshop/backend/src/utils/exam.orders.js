const Order = require('../models/order.model');

const mockDB = require('../db/db');

const generateOrderNumber = async () => {
    let newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    const numExists = await numAlreadyExists(newNumber);
    while(numExists) {
        newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    }
    return newNumber;
};

const numAlreadyExists = (num) => Order.findOne({number: num});


// Később id validátor
const examOrderNumber = (number) => {
    let orderNumberError = '';
    const data = mockDB.orders.find(data => data.number === number);
    if(!data) {
        orderNumberError = 'Number not found in database!';
    }
    return orderNumberError;
}


module.exports = {
    generateOrderNumber,
    examOrderNumber
};