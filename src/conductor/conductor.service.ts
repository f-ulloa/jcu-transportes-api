import { Injectable } from '@nestjs/common';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from './entities/conductor.entity';

@Injectable()
export class ConductorService {
  constructor(
    @InjectRepository(Conductor)
    private readonly conductorRepository: Repository<Conductor>,
  ) {}
  create(createConductorDto: CreateConductorDto) {
    return this.conductorRepository.save(createConductorDto);
  }

  findAll() {
    return this.conductorRepository.find();
  }

  findOne(id: number) {
    return this.conductorRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(nombre: string) {
    return this.conductorRepository.findOne({
      where: { nombre },
    });
  }

  update(id: number, updateConductorDto: UpdateConductorDto) {
    return this.conductorRepository.update(id, updateConductorDto);
  }

  remove(id: number) {
    return this.conductorRepository.delete(id);
  }
}
