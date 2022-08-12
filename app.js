import express from "express";
import * as db from "./database.js";
import cors from "cors";
import bodyParser from "body-parser";
import * as customer from './customer.js';
let app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(customer.router);
app.listen(3000);

console.log("listening on port 3000");