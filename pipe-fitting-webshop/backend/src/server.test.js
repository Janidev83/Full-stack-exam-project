const config = require('config')
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
            }
        ],
        products: [
            {
              name: "Coupler 20mm",
              manufacturer: "AGRU",
              weldTech: "polyfusion",
              price: 234,
              imageUrl: "http://localhost:3000/images/polyfusion_coupler.jpg"
            },
            {
              name: "Elbow 160mm",
              manufacturer: "Georg Fischer",
              weldTech: "butt-welding",
              price: 12453,
              imageUrl: "http://localhost:3000/images/butt_elbow_90°.jpg"
            },
            {
              name: "Equal Tee 315mm",
              manufacturer: "Plasson",
              weldTech: "heating-plate",
              price: 45632,
              imageUrl: "http://localhost:3000/images/buttwelding_T.jpg"
            },
            {
              name: "Reducer Tee 200mm",
              manufacturer: "Simona",
              weldTech: "heating-plate",
              price: 32543,
              imageUrl: "http://localhost:3000/images/electrofusion_T.jpg"
            },
            {
              name: "Saddle 280/63mm",
              manufacturer: "Viniplast",
              weldTech: "electrofusion",
              price: 710,
              imageUrl: "http://localhost:3000/images/polyfusion_coupler.jpg"
            }
        ],
        tokens: [
            {
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI5YTAxY2I2NWZkYTE4ZDFkYjQzNmYiLCJsYXN0TmFtZSI6IkFtYnJ1cyIsImZpcnN0TmFtZSI6IkrDoW5vcyIsImFkZHJlc3MiOiIxMDMxIEJ1ZGFwZXN0LCBDc8OzbmFraMOheiB1dGNhIDkuIiwiZW1haWwiOiJhbWJqYTE5ODNAZ21haWwuY29tIiwib3JkZXJzIjpbIjY0MzE1Njc4NTBjNzNiZmNmMTM4M2FkNyIsIjY0MzE2YjM5YWE5MmU4MzJiNGJhMjU3YyIsIjY0MzE3NzEyYWE5MmU4MzJiNGJhMjVhYSIsIjY0MzE4MmVhNzllOTYzYjFiN2VhODNlMSIsIjY0MzJmNmNkZTcxYWMwZGRlOWQwMjk0OCIsIjY0MzMyNTFiZTZkYTJlZGQzNGQwZWMxNSIsIjY0MzMyNzZiODg2NGJjYWNmYmFmYTM2MSIsIjY0MzQyZTg3MjAzNWUzYWFlZTc0NjMzNCIsIjY0MzQzYmE4ZTJkYjkwZjk5ZjM3ZjkzMyJdLCJpYXQiOjE2ODExNDY3NDR9.69JJSvbX8cTnUoNjHZvtNa076pTa8A__8si7vk8nBKg"
            }
        ]
    };

    beforeEach(async () => {
        try {
            await mongoose.connect(config.testDatabase.host);
            console.log('MongoDB connection established!');
        } catch(err) {
            console.log(err);
            process.exit();
        }
    });

    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
        console.log('MongoDB connection closed!');
    });

    test('POST /api/login endpoint with valid logindata', async () => {
        await Customer.insertMany(insertData.customers);
        const loginData = {
            email: "kbela@gmail.com",
            password: "belus25"
        };

        const response = await supertest(app).post('/api/login').send(loginData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body.accessToken).toBeTruthy();
        expect(response.body).toHaveProperty('customer');
        expect(response.body.customer._id).toBeTruthy();
        expect(response.body.customer.lastName).toBe(insertData.customers[0].lastName);
        expect(response.body.customer.firstName).toBe(insertData.customers[0].firstName);
        expect(response.body.customer.address).toBe(insertData.customers[0].address);
        expect(response.body.customer.email).toBe(insertData.customers[0].email);
        expect(response.body.customer.orders).toBeTruthy();
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body.refreshToken).toBeTruthy();
    });

    test('POST /api/refresh endpoint with valid refreshtoken', async () => {
        await Token.insertMany(insertData.tokens);
        const token = {
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI5YTAxY2I2NWZkYTE4ZDFkYjQzNmYiLCJsYXN0TmFtZSI6IkFtYnJ1cyIsImZpcnN0TmFtZSI6IkrDoW5vcyIsImFkZHJlc3MiOiIxMDMxIEJ1ZGFwZXN0LCBDc8OzbmFraMOheiB1dGNhIDkuIiwiZW1haWwiOiJhbWJqYTE5ODNAZ21haWwuY29tIiwib3JkZXJzIjpbIjY0MzE1Njc4NTBjNzNiZmNmMTM4M2FkNyIsIjY0MzE2YjM5YWE5MmU4MzJiNGJhMjU3YyIsIjY0MzE3NzEyYWE5MmU4MzJiNGJhMjVhYSIsIjY0MzE4MmVhNzllOTYzYjFiN2VhODNlMSIsIjY0MzJmNmNkZTcxYWMwZGRlOWQwMjk0OCIsIjY0MzMyNTFiZTZkYTJlZGQzNGQwZWMxNSIsIjY0MzMyNzZiODg2NGJjYWNmYmFmYTM2MSIsIjY0MzQyZTg3MjAzNWUzYWFlZTc0NjMzNCIsIjY0MzQzYmE4ZTJkYjkwZjk5ZjM3ZjkzMyJdLCJpYXQiOjE2ODExNDY3NDR9.69JJSvbX8cTnUoNjHZvtNa076pTa8A__8si7vk8nBKg"
        };

        const response = await supertest(app).post('/api/refresh').send(token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body.accessToken).toBeTruthy();
    });

    test('POST /api/logout endpoint with valid refreshtoken', async () => {
        await Token.insertMany(insertData.tokens);
        const token = {
            refreshToken: insertData.tokens[0].refreshToken
        };

        const response = await supertest(app).post('/api/logout').send(token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({});
    });

    test('POST /api/registration endpoint with valid data', async () => {
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

    test('PUT /api/customer/:id endpoint with valid id and data', async () => {
        const savedCustomers = await Customer.insertMany(insertData.customers);
        const loginResponse = await supertest(app).post('/api/login')
        .send({
            email: "kbela@gmail.com",
            password: "belus25"
        });
        ACCESS_TOKEN = loginResponse.body.accessToken;
        REFRESH_TOKEN = loginResponse.body.refreshToken;

        const updateData = {
            lastName: "Kómár",
            firstName: "János",
            address: "Csónakház utca 9.",
            email: "kbela@gmail.com",
            password: "janika123"
        };

        const response = await supertest(app).put(`/api/customer/${savedCustomers[0]._id.toString()}`)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`).send(updateData);

        expect(response.statusCode).toBe(201);
        expect(response.body._id).toBe(savedCustomers[0]._id.toString());
        expect(response.body.lastName).toBe(savedCustomers[0].lastName);
        expect(response.body.firstName).toBe(updateData.firstName);
        expect(response.body.address).toBe(updateData.address);
        expect(response.body.email).toBe(savedCustomers[0].email);
        expect(response.body.orders).toEqual(savedCustomers[0].orders);
    });

    test('GET /api/customer endpoint', async () => {
        const savedCustomers = await Customer.insertMany(insertData.customers);
        const loginResponse = await supertest(app).post('/api/login')
        .send({
            email: "kbela@gmail.com",
            password: "belus25"
        });
        ACCESS_TOKEN = loginResponse.body.accessToken;
        REFRESH_TOKEN = loginResponse.body.refreshToken;

        const response = await supertest(app).get('/api/customer').set('Authorization', `Bearer ${ACCESS_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(savedCustomers[0]._id.toString());
        expect(response.body.lastName).toBe(insertData.customers[0].lastName);
        expect(response.body.firstName).toBe(insertData.customers[0].firstName);
        expect(response.body.address).toBe(insertData.customers[0].address);
        expect(response.body.email).toBe(insertData.customers[0].email);
        expect(response.body.orders).toEqual(savedCustomers[0].orders);
    });

    test('GET /api/product endpoint with valid query data', async () => {
        const savedProducts = await Product.insertMany(insertData.products);
        const response = await supertest(app).get('/api/product').query({volume: '2'});

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(3);
        response.body.forEach((product, index) => {
            expect(product._id).toBe(savedProducts[index + 2]._id.toString());
            expect(product.name).toBe(insertData.products[index + 2].name);
            expect(product.manufacturer).toBe(insertData.products[index + 2].manufacturer);
            expect(product.weldTech).toBe(insertData.products[index + 2].weldTech);
            expect(product.price).toBe(insertData.products[index + 2].price);
            expect(product.imageUrl).toBe(insertData.products[index + 2].imageUrl);
        });
    });

    test('POST /api/order/:id endpoint with valid customer id and data', async ()=> {
        const savedCustomer = await Customer.insertMany(insertData.customers);
        const loginResponse = await supertest(app).post('/api/login')
        .send({
            email: "kbela@gmail.com",
            password: "belus25"
        });
        ACCESS_TOKEN = loginResponse.body.accessToken;
        REFRESH_TOKEN = loginResponse.body.refreshToken;

        const request = {
            deliveryAddress: insertData.customers[0].address,
            paidAmount: 253567
        };

        const response = await supertest(app).post(`/api/order/${savedCustomer[0]._id.toString()}`)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`).send(request);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({});
    });

    test('GET /api/order endpoint with valid customer id', async () => {
        const savedCustomers = await Customer.insertMany(insertData.customers);
        const newOrder = {
            deliveryAddress: insertData.customers[0].address,
            paidAmount: 253567
        };


        const loginResponse = await supertest(app).post('/api/login')
        .send({
            email: "kbela@gmail.com",
            password: "belus25"
        });
        ACCESS_TOKEN = loginResponse.body.accessToken;
        REFRESH_TOKEN = loginResponse.body.refreshToken;

        await supertest(app).post(`/api/order/${savedCustomers[0]._id.toString()}`)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`).send(newOrder);
        
        const response = await supertest(app).get('/api/order').set('Authorization', `Bearer ${ACCESS_TOKEN}`)

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(1);
        response.body.forEach(order => {
            expect(order).toHaveProperty('_id');
            expect(order).toHaveProperty('number');
            expect(order).toHaveProperty('date');
            expect(order.deliveryAddress).toBe(savedCustomers[0].address);
            expect(order.paidAmount).toBe(newOrder.paidAmount);
            expect(order.customer).toBe(savedCustomers[0]._id.toString());
        });
    });

    test('DELETE /api/order/:id endpoint with valid order id', async () => {
        const savedCustomers = await Customer.insertMany(insertData.customers);
        const newOrder = {
            deliveryAddress: insertData.customers[0].address,
            paidAmount: 2762728
        };

        const loginResponse = await supertest(app).post('/api/login')
        .send({
            email: "kbela@gmail.com",
            password: "belus25"
        });
        ACCESS_TOKEN = loginResponse.body.accessToken;
        REFRESH_TOKEN = loginResponse.body.refreshToken;

        await supertest(app).post(`/api/order/${savedCustomers[0]._id.toString()}`)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`).send(newOrder);

        const savedOrdersResponse = await supertest(app).get('/api/order').set('Authorization', `Bearer ${ACCESS_TOKEN}`);

        const response = await supertest(app).delete(`/api/order/${savedOrdersResponse.body[0]._id}`)
        .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({});
    });
});