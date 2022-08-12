import sqlite3 from "sqlite3";
let connection =new sqlite3.Database('./shopping.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('connected to shopping database');
});

export {connection};