const Order = require('../models/order.model');


const generateOrderNumber = async () => {
    let newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    const numExists = await numAlreadyExists(newNumber);
    while(numExists) {
        newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    }
    return newNumber;
};

const numAlreadyExists = (num) => Order.findOne({number: num});


module.exports = {
    generateOrderNumber
};