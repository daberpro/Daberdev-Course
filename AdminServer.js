require('dotenv').config();
const express = require('express')
const server = express();
const db = require('./db');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;

function save(model){
	return new Promise((res,rej)=>{
		model.save((err)=>{
			if(err) rej(err);
			res({status: "success"});
		});
	})
}

// verify middleware
const verify = (req,res,next)=>{
	const auth = req.headers['authorization'];

	if(!auth) return res.sendStatus(401);
	if(auth.split(" ")[0] !== "Bearer") return res.sendStatus(401);

	const token = auth.split(" ")[1];
	jwt.verify(token,process.env.SECRET,(err,data)=>{
		
		if(err) return res.sendStatus(403);

		db.UserModel
		.findOne({username: data.username},(err,_data)=>{
			if(err) return res.sendStatus(403);
			if(!_data) return res.sendStatus(403);
			if(!_data.admin) return res.sendStatus(403);

			req._data = data;
			next();

		});

	});
}

server.use(express.json())
server.use(require('cors')('*'))
const Courses = express.Router();
Courses.use((rq,rs,next)=> next());
Courses.use(express.json())
Courses.post("/",verify,(req,res)=>{
	const range = req.body.range || {};
	const auth = req.headers['authorization'];
	const limit = {
		start: range.start || 0,
		count: range.count || 10,
		end: 0
	}

	db.UserModel
	.findOne({username: req._data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);

		db.CourseModel
		.find({})
		.count().exec((_,length)=>{
			db.CourseModel
			.find({})
			.skip(limit.start)
			.limit(limit.count)
			.populate('owner')
			.exec((derr,ddata)=>{
				if(derr) return res.sendStatus(500);

				res.status(200).json({data: ddata,totalLength: length});

			});
		});

	});
});

Courses.post("/search",verify,(req,res)=>{
	const range = req.body.range || {};
	db.UserModel
	.findOne({username: req._data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);


		let search = {};

		if(req.body?.search?.length > 0){
			search = {$text:{$search: req.body?.search}};
		}

		db.CourseModel
		.find(search)
		.populate('owner')
		.exec((derr,ddata)=>{
			if(derr) return res.sendStatus(500);
			res.status(200).json({data: ddata});
		});

	});
});

Courses.post("/add",verify,(req,res)=>{
	const input = req.body.input;
	db.UserModel
	.findOne({username: req._data.username},async (err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);

		const curiculum = new db.CuriculumModel({
			_id: new ObjectId(),
			curiculum_id: '',
			curiculum_file: [],
			curiculum_video: []
		});

		const course = new db.CourseModel({
			_id: new ObjectId(),
			...input,
			curiculum: curiculum._id,
			owner: _data._id,
			thumbnail: ''
		});

		// console.log(course);

		const cur = await save(curiculum).catch(console.log);
		const cour = await save(course).catch(console.log);

		if(cur.status === 'success' && cour.status === 'success'){
			res.status(200).json({
				status: 'success'
			});
		}else{
			res.sendStatus(500);
		}

	});
})

const course_thumbnail_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/assets/course_thumbnail')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix +  path.extname(file.originalname))
  }
});
const upload_thumbnail = multer({storage: course_thumbnail_storage});
Courses.post("/update",[verify,upload_thumbnail.single('course_thumbnail')],(req,res)=>{
	const input = {...req.body, thumbnail: req.file?.filename || ''};
	db.UserModel
	.findOne({username: req._data.username},async (err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);

		
		db.CourseModel
		.findOneAndUpdate({_id: input._id},{...input, _id: ObjectId(input._id)},(err,ddata)=>{
			if(err) return res.sendStatus(500);
			if(!ddata) return res.sendStatus(400);

			if(ddata.thumbnail.length > 0){
				fs.unlinkSync(__dirname+"/assets/course_thumbnail/"+ddata.thumbnail);
			}

			res.status(200).json({
				status: 'success'
			})

		});

	});
})

Courses.delete("/delete",verify,(req,res)=>{
	
	const {ids,count} = req.body;

	db.UserModel
	.findOne({username: req._data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);

		db.CourseModel
			.deleteMany({
				_id:{
					$in: ids || []
				}
			})
			.exec((err,success)=>{
				if(err) return res.sendStatus(500);

				let length = {total: 0};
				db.CourseModel
				.find({})
				.count().exec((_,res)=> length.total = res);

				db.CourseModel
				.find({})
				.limit(count)
				.populate('owner')
				.exec((err,data)=>{
					if(err) return res.sendStatus(500);
					res.status(200).json({
						data,
						totalLength: length.total
					})
				})

			})

	});
})

server.get("/verify",verify,(req,res)=>{
	db.UserModel
	.findOne({username: req._data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(!_data.admin) return res.sendStatus(403);

		res.status(200).json({
			status: 'authenticate'
		})

	});
})

server.post("/admin",verify,(req,res)=>{
	const user = req.body.user;
	db.UserModel
	.findOne({username: req._data.username},(err,_data)=>{
		if(err) return res.sendStatus(403);
		if(!_data) return res.sendStatus(403);
		if(_data.ref_token !== token) return res.sendStatus(403);
		if(_data.admin) return res.sendStatus(403);

		db.UserModel
		.findOneAndUpdate({username: user.username},{admin: user.admin},(err,__data)=>{
			if(err) return res.sendStatus(403);
			if(!__data) return res.sendStatus(403);

			res.sendStatus(200).json({
				user: {...__data,secret: null},
				status: 'success'
			});

		});

	});
});

server.use('/courses',Courses);

server.listen(process.env.ADMIN_PORT,'0.0.0.0',()=>{
	console.log(`admin server running on port ${process.env.ADMIN_PORT}`);
});