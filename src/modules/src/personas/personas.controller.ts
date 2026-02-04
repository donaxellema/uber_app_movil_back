import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonasDto } from './dto/create-personas.dto/create-personas.dto';


@Controller('personas')
export class PersonasController {

  constructor(private readonly personaService: PersonasService) {}

  @Post()
  create(@Body() CreatePersonaDt:CreatePersonasDto) {
    return this.personaService.create(CreatePersonaDt);
  }

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.personaService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personaService.remove(+id);
  }



}
