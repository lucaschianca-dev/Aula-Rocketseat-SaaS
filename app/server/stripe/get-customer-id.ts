import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import "server-only";


/**
 * Função para obter ou criar um ID de cliente no Stripe
 * 
 * @param userId ID do usuário no Firebase
 * @param userEmail Email do usuário
 * @returns ID do cliente no Stripe
 * 
 * Fluxo:
 * 1. Busca o documento do usuário no Firestore
 * 2. Se o usuário já tiver um ID de cliente Stripe, retorna
 * 3. Se não tiver, cria um novo cliente no Stripe
 * 4. Atualiza o documento do usuário com o ID do cliente
 * 5. Retorna o ID do cliente
 * 
 * Em caso de erro:
 * - Se o usuário não existir no Firestore, lança erro
 * - Se houver erro na criação do cliente Stripe, lança erro
 * - Se houver erro na atualização do Firestore, lança erro
 */
export async function getOrCreateCustomerId(userId: string, userEmail: string) {

    try {
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        const stripeCustomerId = userDoc.data()?.stripeCustomerId;

        if (stripeCustomerId) {
            return stripeCustomerId;
        }
        
        const userName = userDoc.data()?.name;

        const stripeCustomer = await stripe.customers.create({
            email: userEmail,
            ...(userName && { name: userName }),
            metadata: {
                userId,
            },
        });

        await userRef.update({
            stripeCustomerId: stripeCustomer.id,
        });

        return stripeCustomer.id;

    } catch (error) {

        console.error("Error getting or creating customer ID:", error);
        throw error;

    } // end try

} // end getOrCreateCustomerId
