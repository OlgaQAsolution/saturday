import { getRandom } from '../utils/helper.js';
import { faker } from '@faker-js/faker';

class TestData {
    validUser = {
        email: process.env.TEST_USER_EMAIL || 'admin@admin.com',
        password: process.env.TEST_USER_PASSWORD || 'admin123',
    };
    invalidPasswords = ['<admin123>', 'admin 123', 'adminl23', 'admin@123', 'password', '', " OR '1'='1", ' '];

    invalidUser = {
        email: 'admin@admin.com',
        password: getRandom(this.invalidPasswords),
    };

    validAddress = {
        phone: '1234567890',
        street: '123 Main St',
        city: 'New York',
        country: 'United States of America',
    };
    invalidAddresses = [
        {
            street : faker.location.streetAddress(),
            city: faker.location.city(),
            country: 'United States of America',
        },
        {
            phone: faker.phone.number('##########'),
            city: faker.location.city(),
            country: 'United States of America',
        },
        {
            phone: faker.phone.number('##########'),
            street: faker.location.streetAddress(),
            country: 'United States of America',
        },
        {
            phone: faker.phone.number('##########'),
            street: faker.location.streetAddress(),
            city: faker.location.city(),
        },
    ];

    items = [
        {
            name: 'Apple iPhone 12, 128GB, Black',
            price: '$905.99',
            quantity: `1`,
            image: 'iphone_12.png',
        },
        {
            name: 'Huawei Mate 20 Lite, 64GB, Black',
            price: '$236.12',
            quantity: `1`,
            image: 'huawei_mate20.png',
        },
        {
            name: 'Samsung Galaxy A32, 128GB, White',
            price: '$286.99',
            quantity: `1`,
            image: 'samsung_a32.png',
        },
        {
            name: 'Apple iPhone 13, 128GB, Blue',
            price: '$918.99',
            quantity: `1`,
            image: 'iphone_13.png',
        },
        {
            name: 'Nokia 105, Black',
            price: '$19.99',
            quantity: `1`,
            image: 'nokia.png',
        },
    ];
    filePath = 'data/cat.png';

    urls = {
        login: 'https://qa-practice.netlify.app/auth_ecommerce',
        fileUpload: 'https://qa-practice.netlify.app/file-upload',
    };
}

export default new TestData();
