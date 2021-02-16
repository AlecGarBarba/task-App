//.\mongod.exe --dbpath="C:/Users/alecb/OneDrive/MongoDB-data"
const express = require('express')
require('./db/mongoose.js'); //just need this to run.
const User = require('./models/user');
const Task = require('./models/task');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()); //automatically parse json :)

app.post('/users', (req,res)=>{
    const user = new User(req.body);

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
});

app.get('/users', (req,res)=>{
    User.find({}).then((users)=>{       //if empty object, it fetches all Users in Mongo db :) search criterias can be made here
        res.send(users);
    }).catch((error)=>{
        res.status(500).send()  //internal server error
    })          
})

app.get('/users/:id', (req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user);

    }).catch((error)=>{
        res.status(500).send(error.message)
    })
})

app.post('/tasks', (req,res)=>{
    const task = new Task(req.body);

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
});
app.get('/tasks', (req,res)=>{
    Task.find({}).then((tasks)=>{       //if empty object, it fetches all Users in Mongo db :) search criterias can be made here
        res.send(tasks);
    }).catch((error)=>{
        res.status(500).send()  //internal server error
    })          
})

app.get('/tasks/:id', (req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task);

    }).catch((error)=>{
        res.status(500).send(error.message)
    })
})



app.listen(port, ()=>{
    console.log("Server is up on port: " + port)
})