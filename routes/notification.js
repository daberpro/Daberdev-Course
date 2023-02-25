const express = require("express");
const notification = express.Router();

notification.use(express.json());
notification.use((req,res,next)=> next());
notification.post("/payment",(req,res)=>{
	console.log(req.body);
	res.sendStatus(200);
});

notification.post("/recurring",(req,res)=>{
	console.log(req.body);
	res.sendStatus(200);
});


notification.post("/account",(req,res)=>{
	console.log(req.body);
	res.sendStatus(200);
});

module.exports = {
	notification
}