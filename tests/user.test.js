const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const mongoose = require('mongoose')
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name:'Mike',
    email: "Mike@example.com",
    password: "My_secret_Pass7772!",
    tokens: [{
        token: jwt.sign( { _id: userOneId}, process.env.JWT_SECRET )
    }]
}

//globals for jest
afterAll(() => {
    mongoose.connection.close();
});

beforeEach(async()=>{
    await User.deleteMany();
    await new User(userOne).save();
})


test('Should signup a new user',async()=>{
    const response = await request(app).post('/users').send({
        name:'Alec',
        email: "alec@example.com",
        password: "My_secret_Pass777!"
    }).expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertions about the response.
    expect(response.body).toMatchObject({
        user: {
            name:'Alec',
            email: "alec@example.com",
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('My_secret_Pass777!');
});

test('Should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(response.body.user._id);

    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should fail login', async()=>{
    await request(app).post('/users/login')
        .send({
            email: "nonexistentuser@mail.com",
            password:"not the password"
        })
        .expect(400);
})

test('Should get profile for user', async()=>{
    await request(app).get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should not get profile for user', async()=>{
    await request(app).get('/users/me')
        .set('Authorization',`Bearer nottheuser`)
        .send()
        .expect(401)
})

test('Should delete account for user',async()=>{
    const response = await request(app).delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .expect(200); 

    const user = await User.findById(response.body._id);
    expect(user).toBeNull();

});

test('Should not delete account for user',async()=>{
    await request(app).delete('/users/me')
        .set('Authorization',`Bearer nottehuser`)
        .expect(401);
});