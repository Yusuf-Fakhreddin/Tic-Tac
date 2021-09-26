import jwt from "jsonwebtoken";

const generateToken = (id) => {
	// generating token expires in 30 days with id as payload and secret as env var
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default generateToken;
