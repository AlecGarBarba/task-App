const express = require('express');
const router = new express.Router();
const Task = require('../models/task');



router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body);
    try{
        await  task.save();
        res.status(201).send(task)
    }catch (error){
        res.status(400).send(error.message)
    }
});
router.get('/tasks', async (req,res)=>{

    try{
        const tasks = await Task.find({})
        res.send(tasks);
    }catch (error){
        res.status(500).send()  //internal server error
    }
  
})

router.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id', async(req,res)=>{
    const _id = req.params.id;
    const allowedUpdates = ['description','completed'];
    const updatedInfo= req.body;
    const updates = Object.keys(updatedInfo);
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update) );

    if(!isValidUpdate) return res.status(400).send({error: 'Invalid update!'});

    try{
        const newtask = await Task.findByIdAndUpdate(_id, updatedInfo, {new:true, runValidators:true} );
        if(!newtask){
            return res.status(404).send()
        }else{
            res.send(newtask)
        }
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/tasks/:id', async(req,res)=>{
    const _id = req.params.id;
    try{
        const task =await Task.findByIdAndDelete(_id);

        if(!task){
            return res.status(404).send();
        }
        res.send(task)
    }catch(error){
        res.status(500).send();
    }

})

module.exports = router;