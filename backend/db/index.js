import express from "express";
import bodyparser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db =new pg.Client({
    user:"postgres",
  password:"akashjain042006",
  host:"localhost",
  database:"FinanaceTracker",
  port:5432
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

app.get("/",(req,res)=>{
    
})