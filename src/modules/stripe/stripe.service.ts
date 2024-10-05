import { Inject, Injectable } from '@nestjs/common';
import { AppSettings } from 'src/app.settngs';
import { Services } from 'src/utils/services';
import Stripe from 'stripe';
import { StripeDTO } from './dto';

@Injectable()
export class StripeService {
  constructor(@Inject(Services.Stripe) private readonly stripe: Stripe) { }

  public async pay(customer: StripeDTO) {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customer.email,
      line_items: [
        {
          price_data: {
            product_data: {
              name: customer.productName,
            },
            currency: 'eur',
            unit_amount: parseInt(customer.price),
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: AppSettings.Stripe.success_url,
      cancel_url: AppSettings.Stripe.cancel_url,
    });
  }

  public async createPaymentIntent(amount: number, currency: string = 'eur') {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
