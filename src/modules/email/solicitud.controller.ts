import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { ContactDTO, CreateSolicitudDto } from './solicitud.dto';

@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    await this.emailService.sendEmailToFixedRecipient(createSolicitudDto);
    
    const clientEmail = createSolicitudDto.datosNotificacion?.email;
    if (clientEmail) {
      await this.emailService.sendConfirmationEmail(clientEmail);
    }
    
    return { message: 'Solicitud recibida y correos enviados' };
  }

  @Post('contact')
  async contact(@Body() dto: ContactDTO) {
    await this.emailService.sendContactMessage(dto);
    return { message: "Sent." };
  }
}
