const {Schema, ObjectId} = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
		require: [true,'username cannot be empty']
	},
	username: {
		type: String,
		require: [true,'username cannot be empty']
	},
	email: {
		type: String,
		validate: {
	      validator: function(v) {
	        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
	      },
	      message: props => `${props.value} is not a valid email`
	    },
	    require: [true,'email cannot be empty']
	},
	avatar: {
		type: String,
		require: [true,'user avatar cannot be empty']
	},
	courses: {
		type: ObjectId,
		ref: 'course',
		require: [true,'every user must have courses']
	},
	order_history: {
		type: ObjectId,
		ref: 'order_histori',
		require: [true,'every user must have order history']
	},
	ref_token: {
		type: String,
		require: [true,'user must have refresh token']
	},
	quiz: {
		type: [ObjectId],
		ref: 'quiz'
	},
	admin: {
		type: Boolean,
		require: true
	},
});

const CoursesSchema = new Schema({
	courses: {
		type: [ObjectId],
		ref: 'cour',
		require: [true,'courses must be an Array']
	}
});

const CourseSchema = new Schema({
	course_name: {
		type: String,
		require: [true,'course must has a name']
	},
	course_price: {
		type: Number,
		require: [true,'course must has a price']
	},
	owner: {
		ref: 'user',
		type: ObjectId,
		require: [true,'course must has an owner']
	},
	curiculum: {
		ref: 'curiculum',
		type: ObjectId,
		require: [true,'course must has a curiculum']
	},
	course_description: {
		type: String,
		require: true
	},
	thumbnail: {
		type: String,
		require: true
	}
});

CourseSchema.index({
	"$**": 'text'
})


const Curiculum = new Schema({
	curiculum_id: {
		type: String,
		require: [true,'where is curiculum_id']
	},
	curiculum_file: {
		type: [String]
	},
	curiculum_video: {
		type: [String]
	},
	curiculum_quiz: {
		type: [ObjectId],
		ref: 'quiz'
	}
});

const QuizSchema = new Schema({
	title: {
		type: String,
		require: true
	},
	script: {
		type: String,
		require: true
	} 
});

const OrderSchema = new Schema({
	order_id: {
		type: String,
		require: [true,'course must has an order id']
	},
	time: {
		type: String,
		require: [true,'course must has a time order']
	}
});

const OrderHistorySchema = new Schema({
	order_history: {
		type: [ObjectId],
		ref: 'order',
		require: [true,'courses must be an Array']
	}
});

const AdminSchema = new Schema({
	admin: {
		type: ObjectId,
		ref: 'user'
	}
});

module.exports = {
	UserSchema,
	CoursesSchema,
	OrderHistorySchema,
	CourseSchema,
	Curiculum,
	OrderSchema,
	AdminSchema,
	QuizSchema
}