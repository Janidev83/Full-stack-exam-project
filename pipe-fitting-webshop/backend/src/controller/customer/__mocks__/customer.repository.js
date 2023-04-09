const customerRepository = jest.mock('./customer.repository');


let mockData;

customerRepository.update = jest.fn((id, data) => {
    let customer = mockData.find(person => person._id === id);
    customer = {...customer, ...data};
    mockData.push(customer);

    return Promise.resolve(customer);
});

customerRepository.findById = jest.fn(id => {
    return Promise.resolve(mockData.find(customer => customer._id === id));
});

customerRepository.findByEmail = jest.fn(email => {
    const isRegistered = mockData.find(customer => customer.email === email);

    return Promise.resolve(isRegistered);
});

customerRepository.__setMockData = data => {
    mockData = data;
};

module.exports = customerRepository;