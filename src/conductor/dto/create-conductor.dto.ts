import { IsOptional, IsString } from 'class-validator';

export class CreateConductorDto {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsOptional()
  @IsString()
  patente: string;

  @IsOptional()
  @IsString()
  modelo_auto: string;
}
