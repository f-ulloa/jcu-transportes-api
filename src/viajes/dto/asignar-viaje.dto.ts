import { PartialType } from '@nestjs/mapped-types';
import { CreateViajeDto } from './create-viaje.dto';
import { IsObject, IsString } from 'class-validator';

export class AsignarViajeDto extends PartialType(CreateViajeDto) {
  @IsObject()
  conductor: Conductor;
}

class Conductor {
  @IsString()
  nombre: string;

  @IsString()
  fono: string;

  @IsString()
  patente?: string;
}
