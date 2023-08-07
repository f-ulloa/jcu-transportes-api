import { IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  direccion: string;
}
