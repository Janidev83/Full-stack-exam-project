const mockDB = require('../db/db');

const isRegistered = (user) => {
    customerError = '';
    // Id-re átírni majd
    // most nevet sohasem változtasak tesztelésből!
    const isSaved = mockDB.customers.find(customer => customer.lastName === user.lastName);
    if(!isSaved) {
        customerError = 'Customer not found in database!';
    }
    return customerError;
}

module.exports = {
    isRegistered
}