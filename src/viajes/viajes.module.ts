import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';
import { PasajeroModule } from 'src/pasajero/pasajero.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { ConductorModule } from 'src/conductor/conductor.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PasajeroModule,
    ConductorModule,
    EmpresaModule,
    EmailModule,
    TypeOrmModule.forFeature([Viaje]),
  ],
  controllers: [ViajesController],
  providers: [ViajesService],
})
export class ViajesModule {}
