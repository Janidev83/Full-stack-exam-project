const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Customer = require('./models/customer.model');
const Order = require('./models/order.model');
const Product = require('./models/product.model');
const Token = require('./models/token.model');


describe('REST API integration tests', ()=> {
    let ACCESS_TOKEN;
    let REFRESH_TOKEN;

    const insertData = {
        customers: [
            {
                lastName: "Kómár",
                firstName: "Béla",
                address: "Vályog utca 32.",
                email: "kbela@gmail.com",
                password: "belus25"
            },
            {
                lastName: "Gyantár",
                firstName: "Gábor",
                address: "Kismaros sétány 321",
                email: "gygabor@gmail.com",
                password: "125gabi533"
            },
        ],
        products: [
            {
              name: "Coupler 20mm",
              manufacturer: "AGRU",
              weldtech: "polyfusion",
              price: 234,
              imageUrl: "http://localhost:3000/images/polyfusion_coupler.jpg"
            },
            {
              name: "Elbow 160mm",
              manufacturer: "Georg Fischer",
              weldtech: "butt-welding",
              price: 12453,
              imageUrl: "http://localhost:3000/images/butt_elbow_90°.jpg"
            },
            {
              name: "Equal Tee 315mm",
              manufacturer: "Plasson",
              weldtech: "heating-plate",
              price: 45632,
              imageUrl: "http://localhost:3000/images/buttwelding_T.jpg"
            },
            {
              name: "Reducer Tee 200mm",
              manufacturer: "Simona",
              weldtech: "heating-plate",
              price: 32543,
              imageUrl: "http://localhost:3000/images/electrofusion_T.jpg"
            },
            {
              name: "Saddle 280/63mm",
              manufacturer: "Viniplast",
              weldtech: "electrofusion",
              price: 710,
              imageUrl: "http://localhost:3000/images/polyfusion_coupler.jpg"
            }
        ]
    };

    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/PipeFittingWebshopTestDB');
        console.log('MongoDB connection established!');
    });

    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        console.log('MongoDB connection closed!');
    });

    test('POST /login endpoint with valid logindata', async () => {
        await Customer.insertMany(insertData.customers);
        const loginData = {
            email: "kbela@gmail.com",
            password: "belus25"
        };

        const response = await supertest(app).post('/api/login').send(loginData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('customer');
        expect(response.body.customer._id).toBeTruthy();
        expect(response.body.customer.lastName).toBe(insertData.customers[0].lastName);
        expect(response.body.customer.firstName).toBe(insertData.customers[0].firstName);
        expect(response.body.customer.address).toBe(insertData.customers[0].address);
        expect(response.body.customer.email).toBe(insertData.customers[0].email);
        expect(response.body.customer.orders).toBeTruthy();
        expect(response.body).toHaveProperty('refreshToken');
    });

    test('POST /refresh endpoint with valid refreshtoken', async () => {
        
    });

    test('POST /registration endpoint with valid data', async () => {
        const newCustomer = {
            lastName: "Ambrus",
            firstName: "János",
            address: "Csónakház utca 9.",
            email: "ambja1983@gmail.com",
            password: "janika123"
        };

        const response = await supertest(app).post('/api/registration').send(newCustomer);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({});
    });
});