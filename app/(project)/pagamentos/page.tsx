"use client";

import { useStripe } from "@/app/hooks/useStripe";

export default function Pagamentos() {

    const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateStripePortal } = useStripe();
    return (
        <div>
            <h1>Pagamentos</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => createPaymentStripeCheckout({ priceId: "testeId", userId: "testeId" })} >Criar pagamento único Stripe</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => createSubscriptionStripeCheckout({ priceId: "testeId", userId: "testeId" })} >Criar assinatura Stripe</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleCreateStripePortal()} >Criar portal de pagamentos Stripe</button>
        </div>
    );
}
