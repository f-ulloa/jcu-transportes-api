import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

class Empresa {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  direccion: string;
}

export class CreatePasajeroDto {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  domicilio: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Empresa)
  empresa: Empresa;
}
