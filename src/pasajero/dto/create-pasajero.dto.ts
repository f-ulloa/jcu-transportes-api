import { IsString } from 'class-validator';

export class CreatePasajeroDto {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  domicilio: string;
}
