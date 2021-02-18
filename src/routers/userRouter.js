const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send(user)
    } catch (error){
        res.status(400).send(error.message)
    }
    
});

router.get('/users', async(req,res)=>{
    try{
        const users = await User.find({})//if empty object, it fetches all Users in Mongo db :) search criteria can be specified here
        res.send(users)
    }catch (error){
        res.status(500).send()  //internal server error
    }
               
})

router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send()
        }
        res.send(user);
    } catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/users/:id', async(req,res)=>{
    const allowedUpdates = ['name','email','password','age'];
    const _id = req.params.id;
    const updatedInfo= req.body;
    const updates = Object.keys(updatedInfo);
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalud update operation!'})
    }
    try{
        //id, updated information of user, and options 
        const newUser = await User.findByIdAndUpdate(_id, updatedInfo, {new:true, runValidators:true}) //new returns the new user.
        if(!newUser){
            return res.status(404).send()
        }else{
            res.send(newUser);
        }
    }catch (error){
        res.status(400).send(error.message)
    }
})

router.delete('/users/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
        const user =await User.findByIdAndDelete(_id);

        if(!user){
            return res.status(404).send();
        }
        res.send(user)
    }catch(error){
        res.status(500).send();
    }
});

module.exports = router;