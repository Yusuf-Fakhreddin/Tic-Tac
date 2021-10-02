import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: [true, "Email already exists"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please add a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			minlength: [6, "Password minimum length is 6"],
			// can not be retrieved by normal querying of users
			select: false,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		googleId: String,
		picture: String,
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

// schema method we can access with instantiated user obj
userSchema.methods.matchPassword = async function (enteredPassword) {
	const user = await User.findOne({ email: this.email }).select("password");

	return await bcrypt.compare(enteredPassword, user.password);
};

// before we save we encrypt the password
userSchema.pre("save", async function (next) {
	// only run when password is modified or saved
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
