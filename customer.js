import express, { response } from "express";
import * as db from "./database.js";

let router=express.Router();

router.get("/customer/id",(req,res)=>{
    db.connection.all(
        `select * from customer where customer.id='${req.query.cid}'`,
        (err,result)=>{
            if (err)res.status(500).send('some error occured');
            else if (!result)res.status(200).send("no such customer id available");
            else{
                res.status(200).send(result);
            }
        }
    )
})
router.get("/customer/all",(req,res)=>{
    db.connection.all('select * from customer',(err,results)=>{
        if(err){
            res.status(500).send('some error occurred');
        }
        else{
            res.status(200).send(results);
        }
    })
})

export{router};