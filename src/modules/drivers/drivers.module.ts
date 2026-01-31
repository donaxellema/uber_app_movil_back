import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Driver } from './entities/driver.entity';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver]),
    UsersModule, // Import UsersModule because DriversService uses UsersService
  ],
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService], // Export DriversService if other modules need to use it
})
export class DriversModule {}
