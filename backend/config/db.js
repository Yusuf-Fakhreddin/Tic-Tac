import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log(
			chalk.green.underline(`MongoDB Connected: ${conn.connection.host}`)
		);
	} catch (error) {
		console.error(chalk.red.inverse(`Error: ${error.message}`));

		process.exit(1);
	}
};

export default connectDB;
