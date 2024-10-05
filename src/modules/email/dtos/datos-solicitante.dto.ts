import { IsString, IsNotEmpty, IsObject } from 'class-validator';
export class CreateDatosSolicitanteDto {
  @IsNotEmpty()
  @IsObject()
  tipoCertificado: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  personaSolicitante: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  numeroCopias: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  provinciaNacimiento: { label: string; value: string };

  @IsNotEmpty()
  @IsString()
  ciudadNacimiento: string;

  @IsNotEmpty()
  @IsString()
  registroCivil: string;

  @IsNotEmpty()
  @IsObject()
  fechaAnterior1930: { label: string; value: string };

  @IsNotEmpty()
  @IsString()
  fechaNacimiento: string;

  @IsNotEmpty()
  @IsString()
  nombreNacido: string;

  @IsNotEmpty()
  @IsString()
  apellidosNacido: string;

  @IsNotEmpty()
  @IsString()
  nombrePadre: string;

  @IsNotEmpty()
  @IsString()
  nombreMadre: string;

  @IsNotEmpty()
  @IsObject()
  finalidadCertificado: { label: string; value: string };
}