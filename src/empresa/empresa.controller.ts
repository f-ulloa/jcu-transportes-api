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
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const conductor = await this.empresaService.findOne(+id);
    if (!conductor) throw new NotFoundException('Empresa not Found');
    return conductor;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    await this.findOne(id);
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id);
    return this.empresaService.remove(+id);
  }
}
