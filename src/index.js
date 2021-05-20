// @ C:\Users\alecb\OneDrive\MongoDB-server\bin>
//.\mongod.exe --dbpath="C:/Users/alecb/OneDrive/MongoDB-data"
const app = require('./app')
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log("Server is up on port: " + port);
});
