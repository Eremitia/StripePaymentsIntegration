import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeCoreModule } from './core/stripecore.module';
import { AppSettings } from 'src/app.settngs';
import { StripeService } from './stripe.service';

@Module({
  imports: [StripeCoreModule.forRoot(AppSettings.Stripe.apiKey, { apiVersion: '2024-06-20' })],
  controllers: [StripeController],
  providers: [StripeService]
})

export class StripeModule {}
