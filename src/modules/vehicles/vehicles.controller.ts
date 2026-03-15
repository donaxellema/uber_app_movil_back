import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Roles(UserRole.DRIVER)
  create(@GetUser('id') driverId: string, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(driverId, createVehicleDto);
  }

  @Get('my-vehicles')
  @Roles(UserRole.DRIVER)
  findMyVehicles(@GetUser('id') driverId: string) {
    return this.vehiclesService.findAllByDriver(driverId);
  }

  @Get(':id')
  @Roles(UserRole.DRIVER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.DRIVER)
  update(
    @Param('id') id: string,
    @GetUser('id') driverId: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehiclesService.update(id, driverId, updateVehicleDto);
  }

  @Delete(':id')
  @Roles(UserRole.DRIVER)
  remove(@Param('id') id: string, @GetUser('id') driverId: string) {
    return this.vehiclesService.remove(id, driverId);
  }
}
