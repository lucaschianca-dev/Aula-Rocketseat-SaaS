import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";


/**
 * Rota para criar uma sessão do portal de gerenciamento de assinatura no Stripe
 * 
 * @param req Requisição HTTP
 * 
 * @returns Resposta com:
 * - url: URL para redirecionamento ao portal de gerenciamento
 * - error: Mensagem de erro (em caso de falha)
 * 
 * Fluxo:
 * 1. Verifica se o usuário está autenticado
 * 2. Busca o ID do cliente Stripe associado ao usuário
 * 3. Cria uma sessão do portal de gerenciamento
 * 4. Retorna a URL para redirecionamento
 */
export async function POST(req: Request) {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();
        const customerId = userDoc.data()?.stripeCustomerId;

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!customerId) {
            return NextResponse.json({ error: "Customer ID not found" }, { status: 404 });
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${req.headers.get("origin")}/dashboard`,
        });

        return NextResponse.json({ url: portalSession.url }, { status: 200 });

    } catch (error) {

        console.error('Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    } // end try

} // POST