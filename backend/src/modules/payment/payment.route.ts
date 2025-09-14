import express, { Router } from "express";
import { createCheckoutSession, stripeWebhook } from "./payment.controller";
import { authenticate } from "../../middlewares/validateRequest";

const router = Router();

// router.route('/create-checkout-session').get(authenticate,createCheckoutSession);
router.route('/create-checkout-session').get(authenticate, createCheckoutSession)

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;