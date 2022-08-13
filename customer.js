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

router.get("/customer/id/items",(req,res)=>{
    db.connection.all(`select * from item
    where item.id in 
    (select shop_order.itemId from shop_order
        where shop_order.customerId='${req.query.cid}')`,(err,results)=>{
            if (err) res.status(500).send('some error occured');
            else{
                res.status(200).send(results);
            }
        })

})
router.get("/shoporder/all",(req,res)=>{
    db.connection.all(`select * from shop_order`,(err,results)=>{
        if (err) res.status(500).send('some error occured');
        else{
            res.status(200).send(results);
        }
    })
})

router.get("/shoporder/id",(req,res)=>{
    db.connection.all(`select * from shop_order where shop_order.id =' ${req.query.orderid}'`,(err,results)=>{
        if (err) res.status(500).send('some error occured');
        else{
            res.status(200).send(results);
        }
    })
})
router.get("/shoporder/orderdate",(req,res)=>{
    db.connection.all(`select * from shop_order 
    where shop_order.order_date >='${req.query.startdate}'
    and shop_order.order_date<='${req.query.enddate}'`,(err,results)=>{
        if (err) res.status(500).send('some error occured');
        else{
            res.status(200).send(results);
        }
    })
})

router.get("/items/all",(req,res)=>{
    db.connection.all(`select * from item`,(err,results)=>{
        if (err) res.status(500).send('some error occured');
        else{
            res.status(200).send(results);
        }
    })
})
router.get("/items/id",(req,res)=>{
    db.connection.all(`select * from item where item.id ='${req.query.itemid}'`,(err,results)=>{
        if (err) res.status(500).send('some error occured');
        else{
            res.status(200).send(results);
        }
    })
})
router.get("/item/id/customer",(req,res)=>{
    db.connection.all(`select * from customer 
    where customer.id in 
    (select shop_order.customerID from shop_order 
        where shop_order.itemID = '${req.query.itemid}')`,(err,results)=>{
            if(err){
                res.status(500).send('some error occurred');
            }
            else{
                res.status(200).send(results);
            }
        })
})
export{router};