import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Controllers, Methods } from 'src/utils/constants';
import { StripeDTO } from './dto';

@Controller(Controllers.Stripe)
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post(Methods.StripePayment)
  public async pay(@Body() customer: StripeDTO) {
    const session = await this.stripeService.pay(customer);
    return { url: session.url };
  }

  @Post('intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    return await this.stripeService.createPaymentIntent(amount);
  }
}
