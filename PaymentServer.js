require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const {v1} = require("./routes/api.js");
const {notification} = require("./routes/notification.js");

server.use(cors("*"));
server.use("/api/v1",v1.checkout);

server.use("/notification",notification);

server.listen(process.env.PAYMENT_PORT,'0.0.0.0',()=>{
	console.log('server running at port '+process.env.PAYMENT_PORT);
});