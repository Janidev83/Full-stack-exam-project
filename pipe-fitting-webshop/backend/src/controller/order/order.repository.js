const mockDB = require('../../db/db');
const { writeFile } = require('fs').promises;
const path = require('path');

const orderDataHandler = {};

const dbPath = path.join(__dirname, '..', '..', 'db', 'db.json');

orderDataHandler.saveNewOrder = async (newOrder) => {
    mockDB.orders.push(newOrder);
    await writeFile(dbPath, JSON.stringify(mockDB, null, 2));
}

orderDataHandler.getOrders = () => {
    return mockDB.orders.slice();
}

orderDataHandler.deleteOrder = async (number) => {
    const mockDbCopy = {...mockDB};
    const orderIndex = mockDbCopy.orders.findIndex(data => data.number === number);
    mockDbCopy.orders.splice(orderIndex, 1);
    await writeFile(dbPath, JSON.stringify(mockDbCopy, null, 2));
}

module.exports = orderDataHandler;