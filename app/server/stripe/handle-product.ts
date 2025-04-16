import { db } from "@/app/lib/firebase";
import "server-only";

import Stripe from "stripe";

export async function handleProductPayment(event: Stripe.CheckoutSessionCompletedEvent) {
    if (event.data.object.payment_status == "paid") {
        console.log("Pagamento do produto aprovado. Enviar um email liberar acesso");

        const metadata = event.data.object.metadata;
        const userId = metadata?.userId;
    
        if (!userId) {
            console.error("User ID not found in metadata");
            return;
        }
        
        await db.collection("users").doc(userId).update({
            subscriptionStatus: "active",
            stripeSubscriptionId: event.data.object.subscription,
        });
    }
}
