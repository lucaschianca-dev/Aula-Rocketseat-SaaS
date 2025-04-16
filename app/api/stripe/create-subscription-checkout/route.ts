import { auth } from "@/app/lib/auth";
import stripe from "@/app/lib/stripe";
import { getOrCreateCustomerId } from "@/app/server/stripe/get-customer-id";
import { NextResponse } from "next/server";

/**
 * Rota para criar uma sessão de checkout de assinatura no Stripe
 * 
 * @param req Requisição contendo:
 * - testeId: ID do teste a ser comprado
 * - userEmail: Email do usuário (opcional)
 * 
 * @returns Resposta com:
 * - sessionId: ID da sessão de checkout
 * - url: URL para redirecionamento ao checkout
 * - error: Mensagem de erro (em caso de falha)
 */
export async function POST(req: Request) {
    const { testeId } = await req.json();

    const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    if (!price) {
        return NextResponse.json({ error: "Price not found" }, { status: 500 });
    }

    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if (!userId || !userEmail) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const customerId = await getOrCreateCustomerId(userId, userEmail);

    const metadata = {
        testeId,
        price,
        userId,
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{ price, quantity: 1 }],
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            customer: customerId,
        });

        if (!session.url) {
            return NextResponse.json({ error: "Session URL not found" }, { status: 500 });
        }

        return NextResponse.json({ sessionId: session.id }, { status: 200 });
        
    } catch (error) {

        console.error('Error:', error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    } // end try

} // POST