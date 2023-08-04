import { IsDateString, IsString } from 'class-validator';
import { CreatePasajeroDto } from 'src/pasajero/dto/create-pasajero.dto';

export class CreateViajeDto {
  @IsDateString()
  fecha: Date;

  @IsDateString()
  hora_llegada: Date;

  @IsString()
  dir_inicio: string;

  @IsString()
  dir_destino: string;

  @IsString()
  pasajeros: CreatePasajeroDto[];
}
