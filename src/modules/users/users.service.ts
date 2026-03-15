import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserStatus } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(role?: string): Promise<User[]> {
    if (role) {
      return this.userRepository.find({ where: { role: role as any } });
    }
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si se envía contraseña, hashearla (por si queremos actualizar pass de admin)
    if (updateUserDto['password']) {
        updateUserDto['password'] = await bcrypt.hash(updateUserDto['password'], 10);
    }
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const existingUser = await this.findByEmail(createAdminDto.email);
    if (existingUser) {
      throw new ConflictException('User with that email already exists');
    }

    const { email, firstName, lastName, role, password } = createAdminDto;
    // Si no manda password, se puede generar temporal (aquí usamos un dummy o requerido)
    const passToHash = password || 'admin1234';
    const hashedPassword = await bcrypt.hash(passToHash, 10);

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      status: UserStatus.ACTIVE,
      emailVerified: true,  // Al ser creado por sistema se puede dar por verificado
    });

    return this.userRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(user.id);
  }

  async restore(id: string): Promise<User> {
    await this.userRepository.restore(id);
    return this.findOne(id);
  }
}
