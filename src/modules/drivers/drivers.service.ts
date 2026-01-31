import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from 'src/common/enums';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly usersService: UsersService,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const user = await this.usersService.findOne(createDriverDto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${createDriverDto.userId} not found`);
    }

    // Optionally, check if a driver profile already exists for this user
    const existingDriver = await this.driverRepository.findOne({ where: { user: { id: user.id } } });
    if (existingDriver) {
      // Or handle as an update or return existing
      throw new Error(`Driver profile already exists for user ${user.id}`);
    }
    
    // Update user role to DRIVER
    user.role = UserRole.DRIVER;
    await this.usersService.save(user);


    const newDriver = this.driverRepository.create({
      user,
    });

    return this.driverRepository.save(newDriver);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async updateStatus(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.findOne(id);
    driver.status = updateDriverDto.status;
    return this.driverRepository.save(driver);
  }

  // Soft delete a driver
  async remove(id: string): Promise<void> {
    const driver = await this.findOne(id);
    await this.driverRepository.softDelete(driver.id);
  }
}
