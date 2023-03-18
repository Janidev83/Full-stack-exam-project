const mockDB = require('../db/db');

const generateOrderNumber = () => {
    let newNumber = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    while(numAlreadyExists(newNumber)) {
        console.log(numAlreadyExists(newNumber));
        newNumber = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    }
    return newNumber;
};

// Később id validátor
const examOrderNumber = (number) => {
    let orderNumberError = '';
    const data = mockDB.orders.find(data => data.number === number);
    if(!data) {
        orderNumberError = 'Number not found in database!';
    }
    return orderNumberError;
}

const numAlreadyExists = (number) => {
    return mockDB.orders.find(order => order.number === number);
};

module.exports = {
    generateOrderNumber,
    examOrderNumber
};