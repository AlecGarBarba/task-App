const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');


router.post('/tasks', auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user.id,
    })
    try{
        await  task.save();
        res.status(201).send(task)
    }catch (error){
        res.status(400).send(error.message)
    }
});
router.get('/tasks', auth,async (req,res)=>{

    try{
        const user = req.user
        await req.user.populate('tasks').execPopulate();
        res.send(user.tasks);
    }catch (error){
        res.status(500).send()  //internal server error
    }
  
})



router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({ _id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const allowedUpdates = ['description','completed'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update) );

    if(!isValidUpdate) return res.status(400).send({error: 'Invalid update!'});

    try{
        const task =  await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update)=> task[update] = req.body[update]);
        await  task.save();
        res.send(task);

    }catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/tasks/:id', auth, async(req,res)=>{
    try{
        const task =await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if(!task){
            return res.status(404).send();
        }
        res.send(task)
    }catch(error){
        console.log(error.message)
        res.status(500).send();
    }

})

module.exports = router;