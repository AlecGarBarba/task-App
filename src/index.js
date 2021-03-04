//.\mongod.exe --dbpath="C:/Users/alecb/OneDrive/MongoDB-data"
const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
require('./db/mongoose.js'); //just need this to run.

const app = express();
const port = process.env.PORT || 3000

// create middleware for maintenance mode

/*app.use((req,res,next)=>{
    console.log(req.method, req.path);
    if(req.method === 'GET'){
        res.status(405).send('GET requests are disabled')
    }else{
        next();
    }
    
});
app.use((req,res, next)=>{
    res.status(503).send("System under maintenance");
})*/



app.use(express.json()); //automatically parse json :)

app.use(userRouter);
app.use(taskRouter);

/*
 * W-out middleware: new req -> run route handler
 * 
 * with middleware: new req-> do smth -> run route handler
*/


app.listen(port, ()=>{
    console.log("Server is up on port: " + port);
});


const User = require('./models/user');
const Task = require('./models/task')

