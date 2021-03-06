import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import intervalStatisticsRoutes from "./routes/intervalStatisticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import stripeRoutes from "./routes/stripeRoutes.js";
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment_intents", stripeRoutes);
app.use("/api/interval_statistics", intervalStatisticsRoutes);
app.use("/api/dashboard", dashboardRoutes);

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

// handling not Found URLs
app.use(notFound);

// Handling returning Errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		chalk.yellow(`App listening in ${process.env.NODE_ENV} on port ${PORT}!`)
	);
});
