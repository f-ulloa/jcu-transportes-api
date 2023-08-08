import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';
import { PasajeroModule } from 'src/pasajero/pasajero.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { ConductorModule } from 'src/conductor/conductor.module';
import { EmailModule } from 'src/email/email.module';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Viaje]),
    PasajeroModule,
    ConductorModule,
    EmpresaModule,
    EmailModule,
    WhatsappModule,
  ],
  controllers: [ViajesController],
  providers: [ViajesService],
})
export class ViajesModule {}
