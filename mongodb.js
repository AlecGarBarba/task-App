//create read update delete
//to init mongo:
//go to OneDrive/MongoDB-sever/bin and use this cmd:
//.\mongod.exe --dbpath="C:/Users/alecb/OneDrive/MongoDB-data"
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017' //needs to be as IS
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{ useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
    if(error) {
        return console.log("Unable to connect to database: ",error)
    }

    const db =client.db(databaseName);

    /*db.collection('users').updateOne({
        _id: new ObjectID('601f6a5f9d78343538ae1e46')
    },{
        $set:{
            name: "Aleksonder"
        }
    }).then((result)=>{
        console.log("Document updated!");
        console.log(result)
    }).catch((err)=>console.log("unable to update Aleksonder :( ", err))
    
   db.collection('users').updateOne({
    _id: new ObjectID('601f6a5f9d78343538ae1e46')
    },{
        $inc:{
            age: 1
        }
    }).then((result)=>{
        console.log("Document updated!");
        console.log(result)
    }).catch((err)=>console.log("unable to update Aleksonder :( ", err))
     
   //update many to update all of the tasks. :)
   db.collection('tasks').updateMany({
       completed: true
   },{
       $set:{
            completed: false
       }
   }).then((result)=>console.log(result.modifiedCount)).catch(()=>console.log("failed at the atempt"))
    */ 
   db.collection('tasks').deleteOne({
       description: 'Clean the dishes'
   }).then((result)=>{
       console.log(result)
   }).catch((error)=> console.log(error))
   //remove a task :) challenge
   db.collection('users').deleteOne({
        name: 'Alec'
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=> console.log(error))
})