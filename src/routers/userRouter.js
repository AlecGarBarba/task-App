const express = require('express');
const router = new express.Router();
const sharp = require('sharp'); //img formatting and shape
/*************************Mongoose/DB handling ***********/
const User = require('../models/user');
/*************Middle ware ******************************/
const auth = require('../middleware/auth');
const upload = require('../middleware/uploading')



router.post('/users' ,async (req,res)=>{ 
    try{
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save()
        res.status(201).send({user, token})
    } catch (error){
        res.status(400).send(error.message)
    }
});

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch (err){
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async(req,res)=>{ //running middleware in specific route.
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        });

        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens =[];
        await req.user.save();
        res.send();
    }catch(err){
        res.status(500).send();
    }
})

router.get('/users/me', auth, async(req,res)=>{
    res.status(200).send(req.user)      
})

router.patch('/users/me', auth, async(req,res)=>{
    const allowedUpdates = ['name','email','password','age'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalud update operation!'})
    }
    try{
        updates.forEach((update)=> req.user[update] = req.body[update]);
        await  req.user.save();
        res.send(req.user);
    }catch (error){
        res.status(400).send(error.message)
    }
})

router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(error){
        console.log(error.message)
        res.status(500).send();
    }
});


router.post('/users/me/avatar',auth, upload.single('avatar') ,async(req,res)=>{
    
    const modifiedBuffer = await sharp(req.file.buffer).png().resize({
        width: 250, height: 250
        }).toBuffer()
    req.user.avatar = modifiedBuffer; //this is where the img is stored
    await req.user.save();
    res.send();
}, (error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
    res.status(500).send({error: error.message})
})

router.get('/users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){ throw new Error() }

        res.set('Content-Type','image/png');
        res.send(user.avatar);
    }catch (e){
        res.status(404).send();
    }
})

module.exports = router;