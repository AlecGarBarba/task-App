//create read update delete

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

    //This returns the first match
   db.collection('users').findOne({ name: 'Danieeel', age: 2910 },(error, document)=>{
    if(error){
        return console.log("Unable to fetch specified user")
    }
    console.log(document)
   })
   //find by id (since it is stored in buffer, we need to objectiFy it)
   db.collection('users').findOne({ _id: new ObjectID("601f694da9912e0b8c754d8d") },(error, document)=>{
    if(error){
        return console.log("Unable to fetch specified user")
    }
    console.log(document)
   })

   //find is diferent. returns a Cursor (apuntador) 

   db.collection('users').find({age:24}).toArray((error,users)=>{
    if(error){
        return console.log("Unable to fetch specified user")
    }
    console.log(users)
   })

   db.collection('users').find({age:24}).count((error,count)=>{
    if(error){
        return console.log("Unable to fetch data")
    }
    console.log(count)
   })

   //FIND and findONE challenge
   //fetch the last task by its id
   //Find to fetch all tasks that are not completed
   db.collection('tasks').findOne({ _id: new ObjectID("601f6cd0f31f0d1c4cb97a3a") },(error, document)=>{
    if(error){
        return console.log("Unable to fetch specified task")
    }
    console.log(document)
   })

   db.collection('tasks').find({ completed:false }).toArray((error,tasks)=>{
    if(error){
        return console.log("Unable to fetch data about tasks")
    }
    console.log(tasks)
   })

})