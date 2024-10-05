import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDatosGeneralesDto {
  @IsNotEmpty()
  @IsString()
  idioma: string;

  @IsNotEmpty()
  @IsString()
  persona: string;
}
