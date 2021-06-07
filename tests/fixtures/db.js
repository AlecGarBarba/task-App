const mongoose = require('mongoose')
const User = require('../../src/models/user');
const jwt = require('jsonwebtoken');


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

const setupDataBase = async()=>{
    await User.deleteMany();
    await new User(userOne).save();
}

const finishTest = async()=>{
    mongoose.connection.close();
}

module.exports = {
    userOneId,
    userOne,
    setupDataBase,
    finishTest
}