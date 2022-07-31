//connection with server
const db=require('./database2');
const express=require('express');
const app=express();
app.listen(5000,()=>{console.log("server running")});
db.connect().then(() => console.log('db connected')).catch((error) => console.log(error.message));
const bodyparser=require('body-parser');
app.use(bodyparser.json());

//routes created
const waiter=require('./Routesuser');
app.use("",waiter);