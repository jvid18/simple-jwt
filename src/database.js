import mongoose from 'mongoose';

const connect = async () => {
	await mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log('Database is connected');
}

export default connect;
