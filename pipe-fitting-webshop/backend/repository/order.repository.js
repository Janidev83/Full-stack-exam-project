const mockDB = require('../db/db');
const { writeFile } = require('fs').promises;
const path = require('path');

const orderDataHandler = {};

const dbPath = path.join(__dirname, '../db', 'db.json');

orderDataHandler.saveNewOrder = async (newOrder) => {
    try {
        mockDB.orders.push(newOrder);
        await writeFile(dbPath, JSON.stringify(mockDB, null, 2));
    } catch(err) {
        // hibakezelést csinálni a http-errors-al
    }
}

module.exports = orderDataHandler;