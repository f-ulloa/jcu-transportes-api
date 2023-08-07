import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    return this.empresaRepository.save(createEmpresaDto);
  }

  findAll() {
    return this.empresaRepository.find({ relations: { viejos: true } });
  }

  findOne(id: number) {
    return this.empresaRepository.findOne({
      where: { id },
      relations: { viejos: true },
    });
  }

  findOneByName(nombre: string) {
    return this.empresaRepository.findOne({ where: { nombre } });
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaRepository.update(id, updateEmpresaDto);
  }

  remove(id: number) {
    return this.empresaRepository.delete(id);
  }
}
