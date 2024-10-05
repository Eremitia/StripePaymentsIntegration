import { Module } from '@nestjs/common';
import { SolicitudController } from './solicitud.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [SolicitudController],
  providers: [EmailService],
})
export class SolicitudModule {}
