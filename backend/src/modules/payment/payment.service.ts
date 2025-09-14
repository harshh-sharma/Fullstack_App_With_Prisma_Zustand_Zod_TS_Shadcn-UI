import Stripe from "stripe";
import prisma from "../../prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2025-08-27.basil" });


const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export const createCheckoutSession = async (userId: string) => {
    const user = await prisma.user.findUnique({where:{id: userId}});
    if(!user) throw new Error('User not found');

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:[
            {
                price_data:{
                    currency:'usd',
                    product_data:{name: "Task Subscription"},
                    unit_amount: 500,
                },
                quantity: 1
            }
        ],
        mode:"payment",
        success_url: `${process.env.CLIENT_URL}/dashboard?payment=success`,
        cancel_url: `${process.env.CLIENT_URL}/dashboard?payment=cancel`,
        metadata: { userId: user.id },
    })
    console.log("session---",session)
 const res =  await prisma.payment.create({
    data:{
        userId:user.id,
        stripeId: session.id,
        amount:500,
        currency:"usd",
        status:"pending"
    }
})

console.log("res",res);



return  {url:session.url};

}

// 🔹 2. Handle Webhook
export const verifyStripeWebhook = (
  rawBody: Buffer,
  stripeSig: string
): Stripe.Event => {
  const event = stripe.webhooks.constructEvent(
    rawBody, // must be raw body
    stripeSig,
    endpointSecret!
  );

  return event;
};


export const handleStripeEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.payment.update({
        where: { stripeId: session.id },
        data: { status: "completed" },
      });

      if (session.metadata?.userId) {
        await prisma.user.update({
          where: { id: session.metadata.userId },
          data: { isPaid: true },
        });
      }
      break;
    }

    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.payment.update({
        where: { stripeId: session.id },
        data: { status: "failed" },
      });
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};