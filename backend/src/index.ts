import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.route";
import taskRoutes from "./modules/task/task.route";
import paymentRoutes from "./modules/payment/payment.route";
import { stripeWebhook } from "./modules/payment/payment.controller";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use("/api/payments/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());

// User module routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/payments",paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
