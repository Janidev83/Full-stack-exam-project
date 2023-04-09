const productRepository = jest.mock('./product.repository');


let mockData;

productRepository.find = jest.fn(volume => {
    const products = [];
    for(let i = volume; i < mockData.length; i++) {
        products.push(mockData[i]);
    }

    return Promise.resolve(products);
});

productRepository.__setMockData = data => {
    mockData = data;
};

module.exports = productRepository;