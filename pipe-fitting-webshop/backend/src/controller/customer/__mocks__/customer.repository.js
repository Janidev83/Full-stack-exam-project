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
})

customerRepository.__setMockData = data => {
    mockData = data;
};

module.exports = customerRepository;