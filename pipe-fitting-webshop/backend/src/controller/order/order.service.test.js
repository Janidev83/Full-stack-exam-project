const orderService = require('./order.service');
const orderRepository = require('./order.repository');
jest.mock('./order.repository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Order service tests', () => {
    let mockData;
    let nextFunction;
    let response;

    beforeEach(() => {
        mockData = [
            {   
                _id: "123",
                number: 6236235,
                date: "1983-10-24",
                deliveryAddress: "Natur utca 5.",
                paidAmount: 14532,
                customerId: "627274"
            },
            {
                _id: "456",
                number: 1651616,
                date: "2014-05-12",
                deliveryAddress: "Csónak utca 34.",
                paidAmount: 32656,
                customerId: "377684"
            },           
            {
                _id: "789",
                number: 1416136,
                date: "2021-08-22",
                deliveryAddress: "Baross utca 23.",
                paidAmount: 162372,
                customerId: "234142"
            }
        ];

        orderRepository.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('save with valid id', () => {

    });
});