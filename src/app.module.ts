import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajesModule } from './viajes/viajes.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { ConductorModule } from './conductor/conductor.module';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
