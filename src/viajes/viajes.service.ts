import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';
import { Repository } from 'typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Pasajero } from 'src/pasajero/entities/pasajero.entity';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { FirmarViajeDto } from './dto/firmar-viaje.dto';
import { EmailService } from 'src/email/email.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
    private readonly emailService: EmailService,
    private readonly whatsappServie: WhatsappService,
  ) {}

  async create(
    createViajeDto: CreateViajeDto,
    empresa: Empresa,
    preLoadPasajeros: Pasajero[],
  ) {
    const viaje = this.viajeRepository.create({
      ...createViajeDto,
      pasajeros: preLoadPasajeros,
      empresa,
    });

    return this.viajeRepository.save(viaje);
  }

  findAll() {
    return this.viajeRepository.find({
      relations: {
        pasajeros: true,
        conductor: true,
        empresa: true,
      },
    });
  }

  findOne(id: number) {
    return this.viajeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        pasajeros: true,
        conductor: true,
        empresa: true,
      },
    });
  }

  update(id: number, updateViajeDto: UpdateViajeDto | FirmarViajeDto) {
    return this.viajeRepository.update({ id }, updateViajeDto);
  }

  async enroll(viaje: Viaje, conductor: Conductor) {
    viaje.conductor = conductor;
    viaje.estado_viaje = 'Aprobado';
    const subject = 'Datos del viaje';
    //this.emailService.sendMail(viaje.correo_remitente, subject, viaje);
    this.whatsappServie.sendMessage('+56948854545', viaje);
    return this.viajeRepository.save(viaje);
  }

  remove(id: number) {
    return this.viajeRepository.delete({ id });
  }
}
