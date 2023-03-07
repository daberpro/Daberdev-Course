const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const {
	UserSchema,
	CoursesSchema,
	OrderHistorySchema,
	CourseSchema,
	Curiculum,
	OrderSchema,
	AdminSchema,
	QuizSchema
} = require('./schema.js');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/daberdev');
}
main().catch(err => console.log(err));

const AdminModel = new mongoose.model('admin',AdminSchema);
const QuizModel = new mongoose.model('quiz',QuizSchema);
const CourseModel = new mongoose.model('cour',CourseSchema);
const CuriculumModel = new mongoose.model('curiculum',Curiculum);
const OrderModel = new mongoose.model('order',OrderSchema);
const UserModel = new mongoose.model('user', UserSchema);
const OrderHistoryModel = new mongoose.model('order_histori', OrderHistorySchema);
const CoursesModel = new mongoose.model('course', CoursesSchema);

CourseModel.createIndexes();

module.exports ={
	UserModel,
	OrderHistoryModel,
	CoursesModel,
	CourseModel,
	CuriculumModel,
	OrderModel,
	AdminModel,
	QuizModel
}
