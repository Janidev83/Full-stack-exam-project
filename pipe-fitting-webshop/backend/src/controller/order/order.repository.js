const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');
const createError = require('http-errors');


exports.save = async (order) => {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();

    const customer = await Customer.findById(order.customer);
    if(!customer) throw new createError.NotFound();

    customer.orders.push(newOrder._id);
    await customer.save();

    return savedOrder;
}

exports.getOrdersByUserId = id => Order.find({customer: id});

exports.deleteOrder = async (orderId, customerId) => {
    const removedOrder = await Order.findByIdAndRemove(orderId);
    if(!removedOrder) throw new createError.NotFound();
    
    const customer = await Customer.findById(customerId);
    if(!customer) throw new createError.NotFound();

    const orderIndex = customer.orders.findIndex(objectId => orderId === objectId.toString());
    if(orderIndex === -1) throw new createError.NotFound();

    customer.orders.splice(orderIndex, 1);
    customer.save();
    return removedOrder;
}
