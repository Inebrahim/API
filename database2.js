//database created
const {Client}=require('pg');
const client=new Client({
host: 'localhost',
user:'postgres',
port:5432,
password:'i5186027',
database:'Restraunt'
})
module.exports=client;