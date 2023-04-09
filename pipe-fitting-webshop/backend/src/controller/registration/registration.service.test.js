const registrationService = require('./registration.service');
const registrationRepository = require('./registration.repository');
const customerRepository = require('../customer/customer.repository');
jest.mock('./registration.repository');
jest.mock('../customer/customer.repository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');


describe('Registration service tests', () => {
    let mockData;
    let nextFunction;
    let response;

    beforeEach(() => {
        mockData = [
            {   
                _id: "123",
                lastName: "kovács",
                firstName: "Béla",
                address: "Natur utca 5.",
                email: "bela@gmail.com",
                password: "bela445",
            },
            {
                _id: "456",
                lastName: "Faragó",
                firstName: "Zoltán",
                address: "Hegytető út 43.",
                email: "zoltan@gmail.com",
                password: "zoli123",
            },           
            {
                _id: "789",
                lastName: "Lázás",
                firstName: "Péter",
                address: "Lomb utca 85.",
                email: "peter@gmail.com",
                password: "peti525",
            }
        ];

        registrationRepository.__setMockData(mockData);
        customerRepository.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('create with valid customer data', async () => {
        const request = mockRequest({
            body: {
                lastName: "Dorkai",
                firstName: "Endre",
                address: "Patak út 143.",
                email: "endre.dorkai@gmail.com",
                password: "34endre356"
            }
        });

        await registrationService.create(request, response, nextFunction);
        expect(customerRepository.findByEmail).toBeCalledWith(request.body.email);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith({});
    });
});