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
		require: [true,'every user must have courses']
	},
	order_history: {
		type: ObjectId,
		require: [true,'every user must have order history']
	},
	ref_token: {
		type: String,
		require: [true,'user must have refresh token']
	}
});

const CoursesSchema = new Schema({
	courses: {
		type: Array,
		require: [true,'courses must be an Array']
	}
});

const OrderHistorySchema = new Schema({
	order_history: {
		type: Array,
		require: [true,'courses must be an Array']
	}
});

module.exports = {
	UserSchema,
	CoursesSchema,
	OrderHistorySchema
}