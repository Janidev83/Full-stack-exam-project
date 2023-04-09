const { findOrderByNumber } = require('../controller/order/order.repository');


const generateOrderNumber = async () => {
    let newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    const numExists = await findOrderByNumber(newNumber);
    while(numExists) {
        newNumber = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
    }
    return newNumber;
};


module.exports = {
    generateOrderNumber
};