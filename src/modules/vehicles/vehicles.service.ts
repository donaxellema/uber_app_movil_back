import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(driverId: string, createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({ where: { plate: createVehicleDto.plate } });
    if (existingVehicle) {
      throw new ConflictException('Vehicle with this plate already exists');
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      driverId,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async findAllByDriver(driverId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ where: { driverId } });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not found`);
    }
    return vehicle;
  }

  async update(id: string, driverId: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    
    // Solo un admin o el propio conductor pueden actualizar
    if (vehicle.driverId !== driverId) {
      throw new BadRequestException('You are not the owner of this vehicle');
    }

    if (updateVehicleDto.plate) {
      const existingVehicle = await this.vehicleRepository.findOne({ where: { plate: updateVehicleDto.plate } });
      if (existingVehicle && existingVehicle.id !== id) {
         throw new ConflictException('Vehicle with this plate already exists');
      }
    }

    Object.assign(vehicle, updateVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: string, driverId: string): Promise<void> {
    const vehicle = await this.findOne(id);
    
    if (vehicle.driverId !== driverId) {
      throw new BadRequestException('You are not the owner of this vehicle');
    }

    await this.vehicleRepository.softRemove(vehicle);
  }
}
