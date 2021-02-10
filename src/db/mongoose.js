const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//model definition :) 
const User = mongoose.model('User',
    {
        name:{
            type: String,
            required: true,

        },
        age: {
            type: Number,

        }
})

const Task = mongoose.model('Tasks',
    {
        description:{
            type: String,

        },
        completed: {
            type: Boolean,

        }
})

//instance of model object 

const alec = new User({name: "Alec Barba", age: 24});
const task1 = new Task({description:"Clean the dishes", completed: false})


//CRUD or so
/*
alec.save().then(()=>{
    console.log(alec) // :)
}).catch(error=> console.log(error._message))
*/

task1.save().then(()=>{
    console.log(task1) // :)
}).catch(error=> console.log(error._message))