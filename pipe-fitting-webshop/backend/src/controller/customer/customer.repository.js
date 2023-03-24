const mockDB = require('../../db/db');
const { writeFile } = require('fs').promises;
const path = require('path');

const customerDataHandler = {};

const dbPath = path.join(__dirname, '..', '..', 'db', 'db.json');

customerDataHandler.updateCustomer = async (customer) => {
    const mockDbCopy = {...mockDB};
    // majd id lesz
    const customerIndex = mockDbCopy.customers.findIndex(user => user.lastName === customer.lastName);
    mockDbCopy.customers[customerIndex] = {...customer};
    await writeFile(dbPath, JSON.stringify(mockDbCopy, null, 2));
}

module.exports = customerDataHandler;