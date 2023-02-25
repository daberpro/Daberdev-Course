const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = require('./schema.js');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/daberdev');
}
main().catch(err => console.log(err));


const UserModel = new mongoose.model('user', Schema.UserSchema);
const OrderHistoryModel = new mongoose.model('order_history', Schema.OrderHistorySchema);
const CoursesModel = new mongoose.model('course', Schema.CoursesSchema);

module.exports ={
	UserModel,
	OrderHistoryModel,
	CoursesModel
}
