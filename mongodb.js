//create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017' //needs to be as IS
const databaseName = 'task-manager'
MongoClient.connect(connectionURL,{ useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
    if(error) {
        return console.log("Unable to connect to database: ",error)
    }

    const db =client.db(databaseName);

    /*db.collection('users').insertOne({
        name: 'Alec',
        age: 24,
    },(error,result)=>{
        if(error){
            return console.log("Unable to insert user")
        }
        console.log(result.ops)
    })

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
    })*/

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

})