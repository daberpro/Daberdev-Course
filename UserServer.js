require('dotenv').config();
const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const cors = require('cors');
const db = require('./db');

server.use(express.json());
server.use(cors("*"));

function verify(req,res,next){
	const auth = req.headers['authorization'];

	if(!auth) return res.sendStatus(401);
	if(auth.split(" ")[0] !== "Bearer") return res.sendStatus(401);

	const token = auth.split(" ")[1];
	jwt.verify(token,process.env.SECRET,(err,data)=>{
		
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
	.populate("courses")
	.populate("order_history")
	.exec((err,_data)=>{
		
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		res.json({..._data._doc,ref_token: ''});
	});
});

server.post("/new-order",verify,(req,res)=>{

	const items = req.body.items || [];
	db.UserModel
	.findOne({username: data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);

		const status = {
			history: false
		}
		
		db.OrderHistoryModel.findOneAndUpdate(
			{_id: _data.courses},
			{
				$push: {
					order_history: items.order_id
				}
			},
			(err,courses)=>{
				if(err) return res.sendStatus(400);
				status.history = true;
			}
		);

		if (status.history) {
			db.CoursesModel.findOneAndUpdate(
				{_id: _data.courses},
				{
					$push: {
						courses: items.items.map(d => d._id)
					}
				},
				(err,courses)=>{
					if(err) return res.sendStatus(400);
					res.json({
						status: "success"
					})
				}
			);
		}

	});

});

server.post("/order-status",verify,async (req,res)=>{
	const tokens = req.body.tokens;

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
			res.json(await result.json().catch(d => console.log(d)))
		}else{
			res.json({});
		}
	}else{
		res.sendStatus(401)
	}
});

server.post("/cours",verify,(req,res)=>{

	db.CourseModel
	.find({})
	.limit(10)
	.populate('owner')
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

		res.status(200).json(data);

	});

});

server.listen(process.env.USER_PORT,'0.0.0.0',()=>{
	console.log(`user server running on port ${process.env.USER_PORT}`);
});