const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
require('./db/mongoose.js'); //just need this to run.
const app = express(); 
app.use(express.json()); //automatically parse json :)

app.use(userRouter);
app.use(taskRouter);

/*
 * W-out middleware: new req -> run route handler
 * 
 * with middleware: new req-> do smth -> run route handler
*/

module.exports = app;