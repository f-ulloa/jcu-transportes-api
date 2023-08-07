import { IsString } from 'class-validator';

export class FirmarViajeDto {
  @IsString()
  url_firma: string;
}
