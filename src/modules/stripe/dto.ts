import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StripeDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  price: string; // Price in cents (string to avoid issues with integer overflow)
}
