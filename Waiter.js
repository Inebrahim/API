//const { request, response, query } = require('express');
//const { json } = require('body-parser');
//const { parse } = require('pg-protocol');
const e = require('express');
const db=require('../database2');

//waiter
const createwaiter=async(request,response)=>{
    try {
        const {name,branch}=request.body
    await db.query(`INSERT INTO waiter(name,branch) values ('${name}','${branch}')`)
    response.json({statusCode:200,message:"record inserted sucessfully",data:[name,branch]})
    } catch (error) {
        response.json({statusCode:501,message:error.message})
    }
}

const displaywaiter=async(request,response)=>{
    try {
       
       const Query=await db.query("Select * from waiter order by waiterid desc");
        response.json({statusCode:200,message:"records displayed successfully",
        data:Query.rows})
    } catch (error) {
        response.json({statusCode:501,message:error.message})
    }
    }
 
   const updatewaiter=async(request,response)=>{
    try {
        let {waiterid}=request.params;
        let {name,branch}=request.body;
        const Query=await db.query(`Select * from waiter where waiterid=${waiterid}`)
       // console.log(Query.rows.length)
        if(Query.rowCount>0){
        await db.query(`UPDATE waiter SET name = $1, branch = $2 WHERE waiterid = $3`,
        [name, branch, waiterid])
        response.json({statusCode:200,message:"update successful",
    data:Query.rows})}
    else{
        response.json({statusCode:404,message:"record not found"})
    }//frontend handling easy
    } catch (error) {
        response.json({statusCode:501,message:error.message})
    }
}

    const deletewaiter=async (request, response) => {
        try {
            const {waiterid} = request.params;
            const id=await db.query(`Select * from waiter where waiterid= ${waiterid}`)
            console.log(id.rows.length)
            if(id.rowCount>0){await db.query('DELETE FROM waiter WHERE waiterid = $1', [waiterid])
            response.json({statusCode:200,message:`Waiter deleted with ID: ${waiterid}`})}
            else{
                response.json({statusCode:404,message:"record not found"})
            }
        } catch (error) {
            response.json({message:error.message})
        }
      }
  
      //user
      const createuser=async(request,response)=>{
        try {
            const {username,favoriteitem}=request.body
            console.log(request.body);
        await db.query(`INSERT INTO users(username,favoriteitem) Values($1,$2)`, [username,favoriteitem])
        response.json({statusCode:200,message:"record inserted sucessfully",data:[username,favoriteitem]})
        } catch (error) {
            response.json({statusCode:501,message:error.message})
        }
    }
    
    const displayuser=async(request,response)=>{
        try {
           
           const Query=await db.query("Select * from users order by userid asc");
            response.json({statusCode:200,message:"records displayed successfully",
            data:Query.rows})
        } catch (error) {
            response.json({statusCode:501,message:error.message})
        }
        }
     
       const updateuser=async(request,response)=>{
        try {
            let {userid}=request.params;
            console.log(request.body)
            let {username,favoriteitem}=request.body;
            const Query=await db.query(`Select * from users where userid=${userid}`)
            console.log(userid,username,favoriteitem)
            if(Query.rowCount>0){
            await db.query(`UPDATE users SET username = $1,favoriteitem=$2 WHERE userid = $3`,
            [username,favoriteitem,userid])
            response.json({statusCode:200,message:"update successful",
            data:Query.rows})}
        else{
            response.json({statusCode:404,message:"record not found"})
        }//frontend handling easy
        } catch (error) {
            response.json({statusCode:501,message:error.message})
        }
    }
    
        const deleteuser=async (request, response) => {
            try {
                const {userid} = request.params;
                const id=await db.query(`Select * from users where userid= ${userid}`)
                console.log(id.rows.length)
                if(id.rowCount>0){await db.query('DELETE FROM users WHERE userid = $1', [userid])
                response.json({statusCode:200,message:`Users deleted with ID: ${userid}`})}
                else{
                    response.json({statusCode:404,message:"record not found"})
                }
            } catch (error) {
                response.json({message:error.message})
            }
          }

     //product
     
     const createproduct=async(request,response)=>{
        try {
            const {productname,productid,userid}=request.body
            const Query=await db.query(`Select * from users where userid=${userid}`)
            if(Query.rows.length>0){
                await db.query(`INSERT INTO products(productname,productid,userid) values($1,$2,$3)`,[productname,productid,userid])
                response.json({statusCode:200,message:"record inserted sucessfully",data:[productname,productid,userid]})}
            else{
                {response.json({statusCode:400,message:"userid not available"})}}
            //if(userid==Query.rows)
        } catch (error) {
            response.json({statusCode:501,message:error.message})
        }
    }
    
    const displayproduct=async(request,response)=>{
        try {
           const Query=await db.query("Select * from products order by userid asc");
            response.json({statusCode:200,message:"records displayed successfully",
            data:Query.rows})
        } catch (error) {
            response.json({statusCode:501,message:"No data found"})
        }
        }
     
       const updateproduct=async(request,response)=>{
        try {
            let {userid}=request.params;
            let {productname,productid}=request.body;
            const Query=await db.query(`Select * from products where userid=${userid}`)
           // console.log(Query.rows.length)
            if(Query.rowCount>0){
            await db.query(`UPDATE products SET productname = $1 WHERE productid = $2`,
            [productname, productid])
            response.json({statusCode:200,message:"update successful",
        data:Query.rows})}
        else{
            response.json({statusCode:404,message:"record not found"})
        }//frontend handling easy
        } catch (error) {
            response.json({statusCode:501,message:error.message})
        }
    }
    
        const deleteproduct=async (request, response) => {
            try {
                const {productid} = request.params;
                const id=await db.query(`Select * from products where productid= ${productid}`)
                console.log(id.rows.length)
                if(id.rowCount>0){await db.query('DELETE FROM products WHERE productid = $1', [productid])
                response.json({statusCode:200,message:`Product deleted with ID: ${productid}`})}
                else{
                    response.json({statusCode:404,message:"record not found"})
                }
            } catch (error) {
                response.json({message:error.message})
            }
          }
    
          const displayjoinedproduct=async(request,response)=>{
            const Query=await db.query(`Select productname,
             username,favoriteitem from products,users Where
            products.productid=users.favoriteitem `)
            response.json({statusCode:200,message:`Successfully displayed`,data:Query.rows})
          }

    module.exports={createwaiter,displaywaiter,deletewaiter,updatewaiter,
        createuser,displayuser,deleteuser,updateuser,
        createproduct,displayproduct,deleteproduct,updateproduct,
        displayjoinedproduct
};
