import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajesModule } from './viajes/viajes.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { ConductorModule } from './conductor/conductor.module';
import { EmpresaModule } from './empresa/empresa.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true,
    }),
    ViajesModule,
    PasajeroModule,
    ConductorModule,
    EmpresaModule,
    EmailModule,
    WhatsappModule,
  ],
  providers: [WhatsappService],
})
export class AppModule {}
