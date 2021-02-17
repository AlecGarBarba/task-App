require('../db/mongoose')

const Task = require('../models/task');

//6024a2066a14194c5867dda3

/*
Task.findByIdAndDelete('6022e705eec6fb25e0717c0b').then((user)=>{
    console.log(user)

    return  Task.countDocuments({completed:false})
}).then( (result)=>{
console.log(result)
}).catch((e)=>{
    console.log(e)
})
*/

const deleteTaskAndCountIncompleteTasks = async(id)=>{
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}

deleteTaskAndCountIncompleteTasks('602c9cde3c6c4e31083581cf').then((count)=>{
    console.log(count);
}).catch((error)=> console.log(error));