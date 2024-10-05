import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateDatosNotificacionDto } from './dtos/datos-notification.dto';
import { CreateDatosSolicitanteDto } from './dtos/datos-solicitante.dto';


export class CreateSolicitudDto {
  @ValidateNested()
  @Type(() => CreateDatosSolicitanteDto)
  datosSolicitante: CreateDatosSolicitanteDto;

  @ValidateNested()
  @Type(() => CreateDatosNotificacionDto)
  datosNotificacion: CreateDatosNotificacionDto;
}

export class ContactDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}