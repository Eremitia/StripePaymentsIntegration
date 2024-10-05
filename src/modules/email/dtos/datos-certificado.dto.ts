import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateDatosCertificadoDto {
  @IsNotEmpty()
  @IsObject()
  tipoCertificado: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  numeroCopias: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  destinatario: { label: string; value: string };

  @IsNotEmpty()
  @IsObject()
  motivo: { label: string; value: string };

  @IsNotEmpty()
  @IsString()
  observaciones: string;

  @IsNotEmpty()
  @IsObject()
  idiomaAnexo: { label: string; value: string };
}
