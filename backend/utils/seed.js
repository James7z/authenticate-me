const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1);

const seedUsers = num => {
    const users = new Array(num).fill('');

    for (let i in users) {
        users[i] = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            // hashedPassword: bcrypt.hashSync(faker.internet.password()),
            hashedPassword: bcrypt.hashSync("password"),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        };
    };

    return users;
}

const seedSpots = num => {
    const spots = new Array(num).fill('');

    let id = 1;
    for (let i in spots) {
        spots[i] = {
            ownerId: id,
            address: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            name: faker.word.adjective() + ' ' + faker.word.noun({ length: { min: 5, max: 8 } }),
            description: faker.lorem.paragraph(),
            price: faker.datatype.number({ min: 50, max: 300 }),
            // zipcode: faker.datatype.number({ min: 91000, max: 98900 })
        };
        id++;
    };

    return spots;
}

const homeImages = [
    'https://a0.muscache.com/im/pictures/d31f1b18-0174-44f5-9c22-36b130b3ca10.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/eeaacea0-53d6-413f-8e6e-be902573ee1d.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/839a2d73-4e97-49e6-a019-a2aace5ae150.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3b2d59f5-422e-4965-a1ed-cf5c336295fd.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3e62daf5-e646-48ba-b58b-5c2a6f9f9f19.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/7546de03-11b3-4bb1-be25-2c3ee70f7cfa.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52897231/original/28ce52c9-cac2-47c3-a3f9-096c258b3509.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/f1dabe12-02e3-4f23-90ef-28e8c713002f.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/410b7b80-cac2-4fb2-808e-156468c2252c.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/1b996001-bfa7-4cf3-9a36-010f0ab9188a.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3b2d59f5-422e-4965-a1ed-cf5c336295fd.jpg?im_w=720g',
    'https://a0.muscache.com/im/pictures/90577b41-8181-4157-961a-b5d0417e9d80.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-822371267656381229/original/74a87714-de68-4bfa-994c-e20086170e92.jpeg?im_w=1200',
    'https://a0.muscache.com/im/pictures/005ba5d5-df1d-4501-a25e-5a062aa19fde.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-687836580250245955/original/6151147d-46bd-46b2-9f8e-fa98c7195d0b.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/6317ae43-0a54-4853-be68-9192b8c43790.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/64ba323e-e909-403c-8dc5-21a302b487e5.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ce8bcd49-c4e6-4811-bd5f-d99293dd00ff.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/83a2e2b5-b9c9-43b5-8108-15b9dee61afe.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-43952787/original/646f253f-7042-42e6-9ae1-130791de256e.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/02b09b7e-ce4b-4da1-bc03-b6f409e8a7d7.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-33294835/original/dfe9cad5-656f-4659-a4b1-886a0efec4f9.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-45456665/original/4439382a-7453-471e-8e00-46c84d6ea7c2.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-671564304391948373/original/4da80fa3-aefe-4673-b62e-0e801d6a3244.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/5ca3804e-8588-4063-bf9f-d7435b02a172.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/4c264e4c-68dd-4396-b818-b79709926c45.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/9916594a-3ad3-4601-8a88-bf9477fe07c8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/2d811bfc-9e1b-41ae-8156-c1df534191ed.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-47796742/original/bb07b729-8ac2-4935-b252-b1b0ae3b24e7.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/7fd6b427-08e6-42f6-a0d8-196edb10f4ea.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/9b6965c0-0e9f-4bf4-b3da-e88b8881d74f.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/20e865d0-6ce5-4bd5-805f-7d0b79f2a1e2.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/fbd239dc-c513-4e40-ac98-6e58ecc67060.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/fda6ed6a-f82e-4fec-8944-b476c50cb411.jpg?im_w=720'
]

// const seedSpotImages = num => {
//     const spotImages = new Array(num).fill('');

//     let id = 1;
//     for (let i in spotImages) {
//         spotImages[i] = {
//             spotId: id,
//             url: homeImages[rNum(homeImages.length - 1)],
//             preview: true
//         };
//         id++;
//     };

//     return spotImages;
// }

const seedSpotImages = num => {
    const spotImages = new Array(num * 5).fill('');

    let id = 1;
    for (let i in spotImages) {
        spotImages[i] = {
            spotId: Math.ceil(id / 5),
            url: homeImages[rNum(homeImages.length - 1)],
            preview: id % 5 === 1 ? true : false
        };
        id++;
    };

    return spotImages;
}

const seedReviews = num => {
    const reviews = new Array(num).fill('');

    let id = 1;
    for (let i in reviews) {
        reviews[i] = {
            spotId: id,
            userId: rNum(100),
            review: faker.lorem.paragraph(),
            stars: rNum(5)
        };
        id++;
    };

    return reviews;
}

const seedReviewImages = num => {
    const reviewImages = new Array(num).fill('');

    let id = 1;
    for (let i in reviewImages) {
        reviewImages[i] = {
            reviewId: id,
            url: faker.image.imageUrl()
        };
        id++;
    };

    return reviewImages;
}

const seedBookings = num => {
    const bookings = new Array(num).fill('');

    let id = 1;
    for (let i in bookings) {
        bookings[i] = {
            spotId: id,
            userId: rNum(5),
            startDate: faker.date.between('2023-02-01', '2023-02-03'),
            endDate: faker.date.between('2023-02-04', '2023-02-07')
        };
        id++;
    };

    return bookings;
}


module.exports = {
    seedUsers,
    seedSpots,
    seedSpotImages,
    seedReviews,
    seedReviewImages,
    seedBookings
}
