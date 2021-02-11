const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
//model definition :) 

/**
 * Add password field to user
 * setup as required, length greater than 5, trim the pasword, ensure that pasword doesn't contain "password"
 * and test
 */
const User = mongoose.model('User',
    {
        name:{
            type: String,
            required: true,
            trim: true,

        },
        email:{
            type:String,
            required:true,
            trim: true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is invalid")
                }
            }
        },
        password:{
            type:String,
            required: true,
            trim:true,
            minLength: 7,
            validate(value){
                if(  value.toLowerCase().includes("password") ){
                    throw new Error("password cannot include the word 'password' ")
                } 
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value){
                if(value < 0){
                    throw new Error('Age must be a positive number ')
                }
            }
        }
})
/**
 * add validation and sanitization to task. Trim description, required
 * make completed opt and default it to false
 */

const Task = mongoose.model('Tasks',
    {
        description:{
            type: String,
            trim: true,
            required: true,

        },
        completed: {
            type: Boolean,
            default: false,
        }
})

//instance of model object 

const alec = new User({name:" Alec    ",email:"AlecBurbu@gmail.com   ", password: "      hola"});
const task1 = new Task({description:"Take out trash", completed: true})


//CRUD or so
/*
alec.save().then(()=>{
    console.log(alec) // :)
}).catch(error=> console.log(error))
*/

task1.save().then(()=>{
    console.log(task1) // :)
}).catch(error=> console.log(error._message))
