// Not Found URLs
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// returning thrown errors and try{}catch{} blocks errors
const errorHandler = (err, req, res, next) => {
	//always log the error to know its properties and make conditions based on it
	console.log(err);

	// Mongoose bad ObjectId
	if (err.name == "CastError") {
		err.message = `Resource not found with id of ${err.value}`;
	}

	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { notFound, errorHandler };
