import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto/create-usuario.dto';
import { create } from 'domain';
//import { GetUser } from 'src/common/decorators';
import { UpdateUsuarioDto } from 'src/modules/src/usuarios/dto/update-usuario.dto/update-usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarioSservice: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto:CreateUsuarioDto) {
    return this.usuarioSservice.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioSservice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioSservice.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.usuarioSservice.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioSservice.remove(+id);
  }

  /* @Patch('id')
  updateProfile(@GetUser('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.usuarioSservice.update(+id, updateUserDto);
  } */

}

