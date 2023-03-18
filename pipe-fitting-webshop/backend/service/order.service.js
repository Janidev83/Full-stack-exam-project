const orderDataHandler = require('../repository/order.repository');
const { orderValidator } = require('../utils/validators');
const { generateOrderNumber, examOrderNumber } = require('../utils/exam.orders');

const orderService = {};

orderService.save = async (req, res) => {
    const orderError = orderValidator(req.body);
    if(orderError) {
        // http-error hibaobjektum generálása - valamelyik mező hiányzik
        return
    }
    try {
        const newOrder = {
            number: generateOrderNumber(),
            date: new Date().toUTCString(),
            ...req.body
        };
        await orderDataHandler.saveNewOrder(newOrder);
        res.status(201).json(newOrder);
    } catch(err) {
        // http-error hibakezelés
        console.log(err);
        err.message = 'Nem sikerült!'
        res.status(500).json({error: 'Szerver oldali hiba!'});
    }
}

orderService.getOrders = (req, res) => {
    const orders = orderDataHandler.getOrders();
    if(!orders || orders.length === 0) {
        // hibakezelés
        res.status(500).json({error: 'Szerveroldali hiba vagy nincsenek még rendelések!'});
        return
    }
    res.status(200).json(orders);
}

orderService.deleteOrder = async (req, res) => {
    // átírni id-re
    const orderNumber = parseInt(req.params.number);
    const isInvalidNumber = examOrderNumber(orderNumber);
    if(isInvalidNumber) {
        // hibakezelés
        // nincs ilyen számú rendelés az adatbázisban
        return
    }
    try {
        await orderDataHandler.deleteOrder(orderNumber);
        res.status(200).json({confirm: 'Order deleted!'});
    } catch(err) {
        // hibakezelés
        console.log(err);
        err.message = 'Nem sikerült!'
        res.status(500).json({error: 'Szerver oldali hiba!'});
    }
}

module.exports = orderService;