import { Router } from "express";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
});

const router = Router();

router.post("/create-checkout", verifyToken, async (req: any, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Matrix Pro Plan" },
          unit_amount: 500
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: "http://localhost:5173/dashboard",
    cancel_url: "http://localhost:5173/dashboard"
  });

  res.json({ url: session.url });
});

export default router;