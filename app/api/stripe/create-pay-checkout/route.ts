import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

/**
 * Rota para criar uma sessão de checkout de pagamento único no Stripe
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

    const { testeId, userEmail } = await req.json();

    const price = process.env.STRIPE_PRODUCT_PRICE_ID;

    if (!price) {
        return NextResponse.json({ error: "Price not found" }, { status: 500 });
    }

    const metadata = {
        testeId,
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{ price, quantity: 1 }],
            mode: "payment",
            payment_method_types: ["card", "boleto"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            ...(userEmail && { customer_email: userEmail }),
            metadata,
        });

        if (!session.url) {
            return NextResponse.json({ error: "Session URL not found" }, { status: 500 });
        }

        return NextResponse.json({ sessionId: session.id, url: session.url }, { status: 200 });

    } catch (error) {

        console.error('Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    } // end try

} // POST