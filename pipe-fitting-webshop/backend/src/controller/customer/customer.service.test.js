const customerService = require('./customer.service');
const customerRepository = require('./customer.repository');
jest.mock('./customer.repository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');


describe('Customer service tests', () => {
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
                orders: ["43727272", "srjsejsejfsef"]
            },
            {
                _id: "456",
                lastName: "Faragó",
                firstName: "Zoltán",
                address: "Hegytető út 43.",
                email: "zoltan@gmail.com",
                password: "zoli123",
                orders: ["1516161", "srhsejhsej"]
            },           
            {
                _id: "789",
                lastName: "Lázás",
                firstName: "Péter",
                address: "Lomb utca 85.",
                email: "peter@gmail.com",
                password: "peti525",
                orders: ["27srushseh", "2623626szsehsh"]
            }
        ];

        customerRepository.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('update with valid id', async () => {
        const request = mockRequest({
            params: {
                id: "456"
            },
            body: {
                lastName: "Kovács",
                firstName: "Zoltán",
                address: "Hegytető út 43.",
                email: "zoltan@gmail.com",
                password: "34zoli53"
            }
        });

        await customerService.update(request, response, nextFunction);
        expect(customerRepository.update).toBeCalledTimes(1);
        expect(customerRepository.update).toBeCalledWith("456", request.body);
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith({
            _id: "456",
            lastName: "Kovács",
            firstName: "Zoltán",
            address: "Hegytető út 43.",
            email: "zoltan@gmail.com",
            orders: ["1516161", "srhsejhsej"]
        })
    });

    test('sendCustomerdataFromPayLoad with valid payload data', () => {
        const request = mockRequest({
            customer: {
                _id: "26segsh4626",
                lastName: "Doe",
                firstName: "John",
                address: "Philadelphia",
                email: "john.doe@indamail.hu",
                orders: ["esgse62626", "gsg446hh4"]
            }
        });

        customerService.sendCustomerdataFromPayLoad(request, response, nextFunction);
        expect(nextFunction).not.toBeCalled();
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith({
            _id: "26segsh4626",
            lastName: "Doe",
            firstName: "John",
            address: "Philadelphia",
            email: "john.doe@indamail.hu",
            orders: ["esgse62626", "gsg446hh4"]
        });
    });
});