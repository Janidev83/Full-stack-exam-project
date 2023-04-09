const orderRepository = jest.mock('./order.repository');


let mockData;

orderRepository.save = jest.fn(order => {
    mockData.push(order);

    return Promise.resolve(order);
});

orderRepository.getOrdersByUserId = jest.fn(id => {

    return Promise.resolve(mockData.filter(order => order.customerId === id));
});

orderRepository.deleteOrder = jest.fn(id => {
    const order = mockData.find(order => order._id === id);
    const orderIndex = mockData.findIndex(order => order._id === id);
    mockData.splice(orderIndex, 1);
    
    return Promise.resolve(order);
});

orderRepository.__setMockData = data => {
    mockData = data;
};

module.exports = orderRepository;