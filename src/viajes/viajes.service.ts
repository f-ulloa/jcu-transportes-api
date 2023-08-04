import { Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';
import { Repository } from 'typeorm';
import { PasajeroService } from 'src/pasajero/pasajero.service';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
    private readonly pasajeroServise: PasajeroService,
  ) {}

  async create(createViajeDto: CreateViajeDto) {
    const pasajeros = await Promise.all(
      createViajeDto.pasajeros.map((pasajero) =>
        this.pasajeroServise.preloadPasajero(pasajero),
      ),
    );

    const viaje = this.viajeRepository.create({
      ...createViajeDto,
      pasajeros,
    });
    return this.viajeRepository.save(viaje);
  }

  findAll() {
    return this.viajeRepository.find({
      relations: {
        pasajeros: true,
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
      },
    });
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return this.viajeRepository.update({ id }, updateViajeDto);
  }

  remove(id: number) {
    return this.viajeRepository.delete({ id });
  }
}
