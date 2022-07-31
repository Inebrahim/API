//get /waiters
//post /waiters
//get /waiters/:id
//delete /waiters/:id
//patch /waiters/:id 

const express=require('express');
const router=express.Router();
const waiter=require('./Controller2/Waiter');
//waiter
router.post('/waiter',waiter.createwaiter);
router.get('/waiter',waiter.displaywaiter);
router.put('/waiter/:waiterid', waiter.updatewaiter);
router.delete('/waiter/:waiterid',waiter.deletewaiter);
//user(customer)
router.post('/user',waiter.createuser);
router.get('/user',waiter.displayuser);
router.put('/user/:userid', waiter.updateuser);
router.delete('/user/:userid',waiter.deleteuser);
//product
router.post('/product',waiter.createproduct);
router.get('/product',waiter.displayproduct);
router.put('/product/:userid', waiter.updateproduct);
router.delete('/product/:productid',waiter.deleteproduct);
//joinedproduct
router.get('/joinedproduct',waiter.displayjoinedproduct);

module.exports=router;
