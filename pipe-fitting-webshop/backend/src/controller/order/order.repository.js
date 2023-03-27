const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');

const mockDB = require('../../db/db');
const { writeFile } = require('fs').promises;
const path = require('path');

const orderRepository = {};

const dbPath = path.join(__dirname, '..', '..', 'db', 'db.json');

orderRepository.save = (order) => {
    const newOrder = new Order(order);

    return newOrder.save()
    .then(() => Customer.findById(order.customer))
    .then(person => {
        person.orders.push(newOrder._id);
        person.save();
    })
    .then(() => newOrder);
}

orderRepository.getOrders = () => {
    return mockDB.orders.slice();
}

orderRepository.deleteOrder = async (number) => {
    const mockDbCopy = {...mockDB};
    const orderIndex = mockDbCopy.orders.findIndex(data => data.number === number);
    mockDbCopy.orders.splice(orderIndex, 1);
    await writeFile(dbPath, JSON.stringify(mockDbCopy, null, 2));
}

module.exports = orderRepository;