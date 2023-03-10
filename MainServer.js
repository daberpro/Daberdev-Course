require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');

server.use(express.static(__dirname+"/frontend/dist"));
server.use("*",(req,res)=>{
	res.sendFile(__dirname+"/frontend/dist/index.html");
});

server.listen(8080,'akulagi.aku',()=>{
	console.log(`main server running at ${process.env.MAIN_PORT}`);
});