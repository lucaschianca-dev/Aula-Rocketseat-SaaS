import stripe from '@/app/lib/stripe';
import { handleProductPayment } from '@/app/server/stripe/handle-product';
import { handleSubscriptionCancellation } from '@/app/server/stripe/handle-cancel';
import { handleSubscriptionPayment } from '@/app/server/stripe/handle-subscription';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

if (!secret) {
  throw new Error('STRIPE_WEBHOOK_SECRET não está configurado');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !secret) {
      return NextResponse.json({ error: 'No signature or secret' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed': // Pagamento realizado se status = paid
        const metadata = event.data.object.metadata;

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleProductPayment(event);
        }
        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleSubscriptionPayment(event);
        }
        break;
      case 'checkout.session.expired': // Expirou o tempo de pagamento
        console.log('Enviar um email para o usuário avisando que o pagamento expirou.');
        break;
      case 'checkout.session.async_payment_succeeded': // Boleto pago
        console.log('Enviar um email para o usuário avisando que o pagamento foi realizado');
        break;
      case 'checkout.session.async_payment_failed': // Boleto falhou
        console.log('Enviar um email para o usuário avisando que o pagamento falhou.');
        break;
      case 'customer.subscription.created': // Criou assinatura
        console.log('Mensagem de boas vindas porque acabou de assinar');
        break;
      case 'customer.subscription.deleted': // Cancelou a assinatura
        await handleSubscriptionCancellation(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}