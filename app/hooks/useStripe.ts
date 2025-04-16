import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export function useStripe() {
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            setStripe(stripeInstance);
        };
        loadStripeAsync();
    }, []);


    /**
     * Funcao para criar funcao de pagamento unico com Stripe
     * @param checkoutData Dados necessarios para criar a sessao de checkout
     */
    async function createPaymentStripeCheckout(checkoutData: any) {

        if (!stripe) {
            throw new Error("Stripe is not loaded");
        }

        try {
            const response = await fetch("/api/stripe/create-pay-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });
            
        } catch (error) {

            console.error(error);

        }

    } // createPaymentStripeCheckout

    /**
     * Funcao para criar funcao de pagamento de assinatura com Stripe
     * @param checkoutData Dados necessarios para criar a sessao de checkout
     */
    async function createSubscriptionStripeCheckout(checkoutData: any) {

        if (!stripe) {
            throw new Error("Stripe is not loaded");
        }
        
        try {
            const response = await fetch("/api/stripe/create-subscription-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

        } catch (error) {

            console.error(error);

        }

    } // createSubscriptionStripeCheckout

    /**
     * Funcao para criar funcao de portal de assinatura com Stripe
     */
    async function handleCreateStripePortal() {

        const response = await fetch("/api/stripe/create-portal", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        window.location.href = data.url;

    } // handleCreateStripePortal

    return {
        createPaymentStripeCheckout,
        createSubscriptionStripeCheckout,
        handleCreateStripePortal
    };

} // useStripe