import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../modules/auth/guards/roles.guard';
import { Driver } from './entities/driver.entity';

@Controller('drivers')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply JWT and Roles guards
export class DriversController {
  constructor(private readonly driversService: DriversService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) // Only admins can create driver profiles
  async create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) // Only admins can view all drivers
  async findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) // Only admins can view a single driver by ID
  async findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.DRIVER, UserRole.SUPER_ADMIN) // Admins or the driver themselves can update status
  async updateStatus(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.updateStatus(id, updateDriverDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) // Only admins can soft-delete a driver
  async remove(@Param('id') id: string) {
    await this.driversService.remove(id);
    return { message: 'Driver profile soft-deleted successfully' };
  }
}
