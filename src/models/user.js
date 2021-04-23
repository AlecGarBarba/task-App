const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,

    },
    email:{
        type:String,
        required:true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{ //secod object is the options
    timestamps: true
});

userSchema.virtual('tasks',{     //Create a ref between tasks and users(owners)
    ref: 'Tasks',
    localField: '_id', //the key to be foreign
    foreignField: 'owner', //name of the field in the foreign

}); 

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token

}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

userSchema.statics.findByCredentials =async (email,password)=>{
    const user = await User.findOne({ email });
    const passwordsMatch = await bcrypt.compare(password, user?.password); 
    if(user && passwordsMatch){
        return user;
    }
    throw new Error('Unable to login');
} 


//hash the plain text password
userSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
}) //before the user has been saved, we will do smth

//Delete tasks when user is deleted
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id});
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;