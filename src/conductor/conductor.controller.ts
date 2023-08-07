import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Controller('conductor')
export class ConductorController {
  constructor(private readonly conductorService: ConductorService) {}

  @Post()
  create(@Body() createConductorDto: CreateConductorDto) {
    return this.conductorService.create(createConductorDto);
  }

  @Get()
  findAll() {
    return this.conductorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const conductor = await this.conductorService.findOne(+id);
    if (!conductor) throw new NotFoundException('Conductor not Found');
    return conductor;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConductorDto: UpdateConductorDto,
  ) {
    await this.findOne(id);
    return this.conductorService.update(+id, updateConductorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id);
    return this.conductorService.remove(+id);
  }
}
