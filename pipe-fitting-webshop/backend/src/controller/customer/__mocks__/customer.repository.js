const customerRepository = jest.mock('./customer.repository');


let mockData;

customerRepository.update = jest.fn((id, data) => {
    let customer = mockData.find(person => person._id === id);
    customer = {...customer, ...data};
    mockData.push(customer);

    return Promise.resolve(customer);
});

customerRepository.__setMockData = data => {
    mockData = data;
};

module.exports = customerRepository;