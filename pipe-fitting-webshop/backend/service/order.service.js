const orderDataHandler = require('../repository/order.repository');
const { orderValidator } = require('../utils/validators');
const { generateOrderNumber } = require('../utils/exam.orders');

const orderService = {};

orderService.save = (req, res) => {
    const orderError = orderValidator(req.body);
    if(orderError) {
        // http-error hibaobjektum generálása
    }
    const newOrder = {
        number: generateOrderNumber(),
        date: new Date().toUTCString(),
        ...req.body
    };
    orderDataHandler.saveNewOrder(newOrder);
    res.status(201).json({confirm: 'Order saved!'});
}

module.exports = orderService;