import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto, createPasajero } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { PasajeroService } from 'src/pasajero/pasajero.service';
import { EmpresaService } from 'src/empresa/empresa.service';
import { ConductorService } from 'src/conductor/conductor.service';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Viaje } from './entities/viaje.entity';
import { Pasajero } from 'src/pasajero/entities/pasajero.entity';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { FirmarViajeDto } from './dto/firmar-viaje.dto';

@Controller('viajes')
export class ViajesController {
  constructor(
    private readonly viajesService: ViajesService,
    private readonly pasajeroService: PasajeroService,
    private readonly empresaService: EmpresaService,
    private readonly conductorService: ConductorService,
  ) {}

  private async findEmpresaByName(nombre_empresa: string) {
    let empresa: Empresa;

    try {
      empresa = await this.empresaService.findOneByName(nombre_empresa);
    } catch (error) {
      console.error(error);
    }

    if (!empresa) throw new NotFoundException('Empresa not Found');
    return empresa;
  }

  private async preLoadPasajero(pasajeros: createPasajero[], empresa: Empresa) {
    let preloadPasajeros: Pasajero[];

    try {
      preloadPasajeros = await Promise.all(
        pasajeros.map((pasajero) => {
          return this.pasajeroService.preloadPasajero({ ...pasajero, empresa });
        }),
      );
    } catch (error) {
      console.error(error);
    }

    return preloadPasajeros;
  }

  @Post()
  async create(@Body() createViajeDto: CreateViajeDto) {
    const { nombre_empresa, pasajeros } = createViajeDto;
    const empresa = await this.findEmpresaByName(nombre_empresa);
    const preLoadPasajero = await this.preLoadPasajero(pasajeros, empresa);

    let viaje: Viaje;

    try {
      viaje = await this.viajesService.create(
        createViajeDto,
        empresa,
        preLoadPasajero,
      );
    } catch (error) {
      console.error(error);
    }

    return viaje;
  }

  @Get()
  findAll() {
    return this.viajesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let viaje: Viaje;

    try {
      viaje = await this.viajesService.findOne(+id);
    } catch (error) {
      console.error(error);
    }

    if (!viaje) throw new NotFoundException('Viaje not Found');
    return viaje;
  }

  @Patch('/asignar/:id')
  async asignar(
    @Param('id') id_viaje: string,
    @Query('nombre') nombre_conductor: string,
  ) {
    const viaje = await this.findOne(id_viaje);

    let conductor: Conductor;
    try {
      conductor = await this.conductorService.findOneByName(nombre_conductor);
    } catch (error) {
      console.error(error);
    }

    if (!conductor) throw new NotFoundException('Conductor not Found');
    return this.viajesService.enroll(viaje, conductor);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViajeDto: UpdateViajeDto) {
    return this.viajesService.update(+id, updateViajeDto);
  }

  @Patch('/:id/firmar')
  firmar(@Param('id') id: string, @Body() firmarViajeDto: FirmarViajeDto) {
    return this.viajesService.update(+id, firmarViajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viajesService.remove(+id);
  }
}
