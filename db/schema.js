const {Schema, ObjectId} = require('mongoose');
const auto_populate = require('mongoose-autopopulate');

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
	order_history: {
		type: ObjectId,
		autopopulate: true,
		ref: 'order_histori',
		require: [true,'every user must have order history']
	},
	ref_token: {
		type: String,
		require: [true,'user must have refresh token']
	},
	quiz: {
		type: [ObjectId],
		ref: 'quiz',
		autopopulate: true
	},
	admin: {
		type: Boolean,
		require: true
	},
	super_admin: {
		type: Boolean
	},
	courses: {
		type: [ObjectId],
		ref: 'cour',
		autopopulate: true
	}
});
UserSchema.plugin(auto_populate);

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
		autopopulate: true,
		require: [true,'course must has an owner']
	},
	curiculum: {
		ref: 'curiculum',
		type: ObjectId,
		autopopulate: true,
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
CourseSchema.plugin(auto_populate);

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
		ref: 'quiz',
		autopopulate: true
	}
});
Curiculum.plugin(auto_populate);

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
	status:{
		type: String,
		require: true
	},
	time: {
		type: String,
		require: [true,'course must has a time order']
	},
	courses: {
		type: [ObjectId],
		ref: 'cour',
		autopopulate: true,
		require: [true,'every user must have courses']
	}
});
OrderSchema.plugin(auto_populate);

const OrderHistorySchema = new Schema({
	order_history: {
		type: [ObjectId],
		ref: 'order',
		autopopulate: true,
		require: [true,'courses must be an Array']
	}
});
OrderHistorySchema.plugin(auto_populate);

const AdminSchema = new Schema({
	admin: {
		type: ObjectId,
		ref: 'user'
	}
});
AdminSchema.plugin(auto_populate);

module.exports = {
	UserSchema,
	OrderHistorySchema,
	CourseSchema,
	Curiculum,
	OrderSchema,
	AdminSchema,
	QuizSchema
}