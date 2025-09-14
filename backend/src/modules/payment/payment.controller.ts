import { Request, Response } from "express";
import * as PaymentService from "../payment/payment.service";
import Stripe from "stripe";

export const stripeWebhook = async (req: Request, res: Response) => {
  try {
    const sig = req.headers["stripe-signature"] as string;
  
    let event: Stripe.Event;
    try {
      event = PaymentService.verifyStripeWebhook(req.body, sig);
    } catch (err: any) {
      console.error("Webhook signature verification failed", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    await PaymentService.handleStripeEvent(event);
  
    res.json({ received: true });
  } catch (error:any) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
  }
}

export const createCheckoutSession =  async (req: Request, res: Response) => {
    try {
        const {userId} = (req as any).user;
        const amount = 500;
        const data = await PaymentService.createCheckoutSession(userId) ;

        if(!data.url){
            return res.status(400).json({
                success:false,
                message:"something went wrong"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Successfully created payment",
            data:data.url
        })
    } catch (error:any) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
