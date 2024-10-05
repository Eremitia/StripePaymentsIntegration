import { IsString, IsNotEmpty, IsObject, IsBoolean, IsNumber } from 'class-validator';

export class CreateDatosNotificacionDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  codigoPostal: string;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsObject()
  provincia: { label: string; value: string } | null;

  @IsNotEmpty()
  @IsString()
  poblacion: string;

  @IsNotEmpty()
  @IsBoolean()
  aceptoPolitica: boolean;
}