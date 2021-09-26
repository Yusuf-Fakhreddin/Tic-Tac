import nodemailer from "nodemailer";
import chalk from "chalk";
const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secureConnection: false,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
		requireTLS: true,
	});

	const message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	const info = await transporter.sendMail(message);

	console.log(chalk.red.inverse.underline("Message sent: %s", info.messageId));
};

export default sendEmail;
