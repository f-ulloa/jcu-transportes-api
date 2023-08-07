import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsString,
  ValidateNested,
} from 'class-validator';

export class createPasajero {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  domicilio: string;
}
export class CreateViajeDto {
  @IsBoolean()
  esRetiro: boolean;

  @IsEmail()
  correo_remitente: string;

  @IsString()
  fecha: Date;

  @IsString()
  hora_llegada: Date;

  @IsString()
  dir_inicio: string;

  @IsString()
  dir_destino: string;

  @IsString()
  estado_viaje: string;

  @IsString()
  nombre_empresa: string;

  @IsArray()
  @ValidateNested()
  @Type(() => createPasajero)
  pasajeros: createPasajero[];
}
