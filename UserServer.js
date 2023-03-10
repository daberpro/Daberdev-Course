require('dotenv').config();
const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const cors = require('cors');
const db = require('./db');
const ObjectId = require('mongoose').Types.ObjectId;

server.use(express.json());
server.use(cors("*"));

function verify(req,res,next){
	const auth = req.headers['authorization'];

	if(!auth) return res.sendStatus(401);
	if(auth.split(" ")[0] !== "Bearer") return res.sendStatus(401);

	const token = auth.split(" ")[1];
	jwt.verify(token,process.env.SECRET,(err,data)=>{
		
		// console.log(err)
		if(err) return res.sendStatus(403);

		db.UserModel
		.findOne({username: data.username})
		.exec((err,_data)=>{
			if(err) return res.sendStatus(403);
			if(!_data) return res.sendStatus(403);

			req._data = _data;
			next();
		});

	});
}

server.delete("/logout",(req,res)=>{
	const auth = req.headers['authorization'];

	if(!auth) return res.sendStatus(401);
	if(auth.split(" ")[0] !== "Bearer") return res.sendStatus(401);

	const token = auth.split(" ")[1];
	jwt.verify(token,process.env.REFRESH,(err,data)=>{
	
		if(err) return res.sendStatus(403);

		db.UserModel
		.findOneAndUpdate({username: data.username},{ref_token: ""},(err,_data)=>{
			if(err) return res.sendStatus(403);
			if(!_data) return res.sendStatus(403);
			if(_data.ref_token !== token) return res.sendStatus(403);
			
			res.sendStatus(204);

		});

	});
});

server.get("/token",(req,res)=>{
	const auth = req.headers['authorization'];

	if(!auth) return res.sendStatus(401);
	if(auth.split(" ")[0] !== "Bearer") return res.sendStatus(401);

	const token = auth.split(" ")[1];
	jwt.verify(token,process.env.REFRESH,(err,data)=>{
		
		if(err) return res.sendStatus(403);

		db.UserModel
		.findOne({username: data.username},(err,_data)=>{
			if(err) return res.sendStatus(403);
			if(!_data) return res.sendStatus(403);
			if(_data.ref_token !== token) return res.sendStatus(403);
			res.json({
				token: jwt.sign({username: _data.username},process.env.SECRET,{ expiresIn: "15m" })
			});
		});

	});
});

server.get("/profile",verify,(req,res)=>{
	db.UserModel
	.findOne({username: req._data.username})
	.exec((err,_data)=>{
		
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);

		// console.log({..._data._doc,ref_token: ''})
		res.json({..._data._doc,ref_token: ''});
	});
});

server.post("/new-order",verify,(req,res)=>{

	const items = req.body || [];

	const new_order = new db.OrderModel({
		order_id: items.order_id,
		status: 'not paid',
		courses: [...items.items.map(d => d._id)],
		time: new Date()
	});

	new_order.save((err)=>{
		if(err) return res.sendStatus(500);
		db.OrderHistoryModel.findOneAndUpdate(
			{_id: req._data.order_history},
			{
				$push: {
					order_history: new_order._id
				}
			},
			(err,data)=>{
				
				console.log(err);
				if(err) return res.sendStatus(400);

				db.UserModel.findOneAndUpdate({
					_id: req._data._id
				},
				{
					$push: {
						courses: [...items.items.map(d => d._id)]
					}
				},(err,_d)=>{

					// console.log(_d);
					if(err) return res.sendStatus(500);
					res.json({
						status: "success"
					})

				})

			}
		);
	})

});

server.post("/order-status",verify,async (req,res)=>{
	const tokens = req.body;
	// console.log(req.body)

	if(tokens.current_order){
		const result = await fetch(`https://api.sandbox.midtrans.com/v2/${tokens.current_order}/status`,{
			method: "GET",
			headers:{
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Basic ${btoa(process.env.PAYMENT_SERVER_KEY+":")}`
			}
		}).catch(d => console.log(d));

		if(result.ok){
			const order_data = await result.json().catch(console.log);
			if(order_data.transaction_status === "settlement" || order_data.transaction_status === "capture"){
				db.OrderModel.findOne({
					order_id: req.body.current_order
				},(err,result)=>{
					if(err) return res.sendStatus(500);

					if(result.status !== "paid off"){
						db.OrderModel.findOneAndUpdate({
							_id: result._id
						},
						{status: 'paid off'},
						(_err)=> {
							if(_err) return res.sendStatus(500);
							res.json({
								status: 'paid off'
							})
						})
					}else{
						res.json({
							status: 'paid off'
						})
					}
				});
			}else{
				res.json({
					status: order_data.transaction_status
				});
			}
		}else{
			res.json({
				status: 'not paid'
			});
		}
	}else{
		res.sendStatus(401)
	}
});

server.post("/cours",verify,(req,res)=>{

	db.CourseModel
	.find({})
	.where("_id")
	.nin(req._data.courses.map(d => d._id.toString()))
	.limit(10)
	.exec((err,data)=>{
		if(err) return res.sendStatus(500);

		data = data.map(d => 
			({
				...d._doc,
				owner: {
					avatar: d.owner.avatar,
					name: d.owner.name,
					username: d.owner.username
				}
			})
		);

		if(data.length === 0){
			res.status(200).json({
				message: 'Wow! you have all course'
			});
			return;
		}

		res.status(200).json(data);


	});

});

server.listen(process.env.USER_PORT,'0.0.0.0',()=>{
	console.log(`user server running on port ${process.env.USER_PORT}`);
});