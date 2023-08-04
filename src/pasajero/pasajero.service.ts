import { Injectable } from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pasajero } from './entities/pasajero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectRepository(Pasajero)
    private readonly pasajeroRepository: Repository<Pasajero>,
  ) {}

  create(createPasajeroDto: CreatePasajeroDto) {
    return this.pasajeroRepository.save(createPasajeroDto);
  }

  findAll() {
    return this.pasajeroRepository.find();
  }

  findOne(id: number) {
    return this.pasajeroRepository.findOne({ where: { id } });
  }

  update(id: number, updatePasajeroDto: UpdatePasajeroDto) {
    return this.pasajeroRepository.update(id, updatePasajeroDto);
  }

  remove(id: number) {
    return this.pasajeroRepository.delete(id);
  }

  async preloadPasajero(pasajero: CreatePasajeroDto) {
    const { nombre, fono } = pasajero;
    const existingPasajero = await this.pasajeroRepository.findOne({
      where: { nombre, fono },
    });
    if (existingPasajero) {
      return existingPasajero;
    }
    return this.pasajeroRepository.create(pasajero);
  }
}
