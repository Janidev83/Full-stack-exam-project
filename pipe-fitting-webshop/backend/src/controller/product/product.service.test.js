const productService = require('./product.service');
const productRepository = require('./product.repository');
jest.mock('./product.repository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');


describe('Product service tests', () => {
    let mockData;
    let nextFunction;
    let response;

    beforeEach(() => {
        mockData = [
            {
                name: "Coupler 280mm",
                manufacturer: "Simona",
                weldtech: "polyfusion",
                price: 710,
                imageUrl: "http:images/polyfusion_coupler.jpg"
            },
            {
                name: "Elbow 125mm",
                manufacturer: "Viniplast",
                weldtech: "polyfusion",
                price: 1245,
                imageUrl: "http://localhost:3000/iion_coupler.jpg"
            },
            {
                name: "Coupler 32mm",
                manufacturer: "AGRU",
                weldtech: "electrofusion",
                price: 34657,
                imageUrl: "http://localhost:3000/images/electroer.jpg"
            }
        ];

        productRepository.__setMockData(mockData);
        nextFunction = jest.fn();
        response = mockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('find with valid query', async () => {
        const request = mockRequest({
            query: {
                volume: "2"
            }
        });

        await productService.find(request, response, nextFunction);
        expect(productRepository.find).toBeCalledWith(2);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith([{...mockData[2]}]);
    });
});
