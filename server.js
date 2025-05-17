const express = require("express");
const fs = require('fs');
const { json } = require("stream/consumers");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const data = JSON.parse(fs.readFileSync("data.json"))
app.get("/random",(req,res)=>{
    const randomIndex =Math.floor( Math.random() * data.length);
    const randomdata = data[randomIndex];
    res.json(randomdata);
}); 

app.post("/create",(req,res)=>{
    const newproverb = req.body;
    const newproverbid = Date.now().toString();
    newproverb.id = newproverbid;
    data.push(newproverb);
    fs.writeFileSync("data.json",JSON.stringify(data , null , 2));
    res.send("proverb is created.")
})

app.listen(PORT,()=>{
    console.log(PORT)
})