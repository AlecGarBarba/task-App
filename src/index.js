//.\mongod.exe --dbpath="C:/Users/alecb/OneDrive/MongoDB-data"
const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
require('./db/mongoose.js'); //just need this to run.
const app = express();
const port = process.env.PORT || 3000

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

