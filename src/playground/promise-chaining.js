require('../db/mongoose')

const User = require('../models/user');

//6024a2066a14194c5867dda3

/*
User.findByIdAndUpdate('602b54a95ec8a4350c25579c', { age: 24}).then((user)=>{
    console.log(user)

    return  User.countDocuments({age:24})
}).then( (result)=>{
console.log(result)
}).catch((e)=>{
    console.log(e)
})
*/


const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id, { age }); //update user
    const count = await User.countDocuments({ age }); //count the number of people with that age
    return count
}


updateAgeAndCount('602b54a95ec8a4350c25579c', 25).then((count)=>{
    console.log(count)
}).catch((error)=> console.log(error));