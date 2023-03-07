require('dotenv').config();
const express = require('express');
const server = express();

server.use(require('cors')('*'));
server.use(express.static(__dirname+'/assets'));

server.listen(process.env.ASSETS_PORT,'0.0.0.0',()=>{
	console.log(`assets server run at port ${process.env.ASSETS_PORT}`);
})