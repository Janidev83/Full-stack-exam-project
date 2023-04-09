const orderService = require('./order.service');
const orderRepository = require('./order.repository');
const customerRepository = require('../customer/customer.repository');
jest.mock('./order.repository');
jest.mock('../customer/customer.repository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

describe('Order service tests', () => {
    let mockOrders;
    let mockCustomers;
    let nextFunction;
    let response;

    beforeEach(() => {
        mockOrders = [
            {   
                _id: "123",
                number: 6236235,
                date: "1983-10-24",
                deliveryAddress: "Natur utca 5.",
                paidAmount: 14532,
                customerId: "6432f6cde71ac0dde9d02364"
            },
            {
                _id: "456",
                number: 1651616,
                date: "2014-05-12",
                deliveryAddress: "Csónak utca 34.",
                paidAmount: 32656,
                customerId: "2354f6cde71ac0dde9d02364"
            },           
            {
                _id: "789",
                number: 1416136,
                date: "2021-08-22",
                deliveryAddress: "Baross utca 23.",
                paidAmount: 162372,
                customerId: "6432f6cde43ac0dde9d02364"
            }
        ];

        mockCustomers = [
            {   
                _id: "2354f6cde71ac0dde9d02364",
                lastName: "kovács",
                firstName: "Béla",
                address: "Natur utca 5.",
                email: "bela@gmail.com",
                password: "bela445",
                orders: ["43727272", "srjsejsejfsef"]
            },
            {
                _id: "6432f6cde43ac0dde9d02364",
                lastName: "Faragó",
                firstName: "Zoltán",
                address: "Hegytető út 43.",
                email: "zoltan@gmail.com",
                password: "zoli123",
                orders: ["1516161", "srhsejhsej"]
            },           
            {
                _id: "6432f6cde71ac0dde9d02364",
                lastName: "Lázás",
                firstName: "Péter",
                address: "Lomb utca 85.",
                email: "peter@gmail.com",
                password: "peti525",
                orders: ["123", "2623626szsehsh"]
            }
        ];

        orderRepository.__setMockData(mockOrders);
        customerRepository.__setMockData(mockCustomers);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('save with valid id', async () => {
        const request = mockRequest({
            params: {
                id: mockCustomers[0]._id
            },
            body: {
                deliveryAddress: "Csónakház utca 9.",
                paidAmount: 135467
            }
        });

        await orderService.save(request, response, nextFunction);
        expect(customerRepository.findById).toBeCalledWith(request.params.id);
        expect(orderRepository.save).toBeCalled();
        expect(response.status).toBeCalledWith(201);
        expect(response.json).toBeCalledWith({});
    });

    test('getOrders with valid customer id', async () => {
        const request = mockRequest({
            customer: {
                _id: mockCustomers[0]._id
            }
        });

        await orderService.getOrders(request, response, nextFunction);
        expect(orderRepository.getOrdersByUserId).toBeCalledWith(request.customer._id);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith([mockOrders[1]]);
    });

    test('deleteOrder with valid order and customer id', async () => {
        const request = mockRequest({
            params: {
                id: mockOrders[0]._id
            },
            customer: {
                _id: mockCustomers[2]._id
            }
        });

        await orderService.deleteOrder(request, response, nextFunction);
        expect(orderRepository.deleteOrder).toBeCalledWith(request.params.id, request.customer._id);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith({});
    });
});