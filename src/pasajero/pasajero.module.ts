import { Module } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { PasajeroController } from './pasajero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pasajero } from './entities/pasajero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pasajero])],
  controllers: [PasajeroController],
  providers: [PasajeroService],
  exports: [PasajeroService],
})
export class PasajeroModule {}
