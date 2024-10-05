import { Module } from '@nestjs/common';
import { StripeModule } from './modules/stripe/stripe.module';
import { SolicitudModule } from './modules/email/solicitud.module';


@Module({
  imports: [StripeModule, SolicitudModule],
  providers: [],
})
export class AppModule { }
