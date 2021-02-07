/**
 * The reason of being of this file is to insert code related to using MongoDB,auth, or any other 
 *subject covered in the course that doesn't go to production.
 */

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;


//How to create our own id, before we insert a document :)
const id = new ObjectID()
console.log(id);
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017' //needs to be as IS
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{ useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
    if(error) {
        return console.log("Unable to connect to database: ",error)
    }

    const db =client.db(databaseName);

    //insert one document
    db.collection('users').insertOne({
        name: 'Danieeel',
        age: 26,
    },(error,result)=>{
        if(error){
            return console.log("Unable to insert user")
        }
        console.log(result.ops)
    })
    //insert multiple documents
    db.collection('users').insertMany([
        {
            name:'Mariana',
            age: 21
        },{
            name: 'Kino',
            age: 0.1
        }
        ],(error,result)=>{
            if(error){
                return console.log("Unable to insert documents")
            }

            console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description:'Take out the trash',
            completed: true
        },{
            description:'Clean the dishes',
            completed: true
        },{
            description:'Exercise',
            completed: false
        }
        ],(error,result)=>{
            if(error){
                return console.log("Unable to insert documents")
            }
            console.log(result.ops)
    })

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