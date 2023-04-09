const registrationRepository = jest.mock('./registration.repository');


let mockData;

registrationRepository.create = jest.fn(customer => {
    mockData.push(customer);
    return Promise.resolve(customer);
})

registrationRepository.__setMockData = data => {
    mockData = data;
};

module.exports = registrationRepository;