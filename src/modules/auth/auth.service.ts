import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto, LoginDto } from './dto';
import { UserStatus } from '../../common/enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, phone, password, firstName, lastName } = registerDto;

    // Validar que se proporcione al menos email o teléfono
    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: email ? { email } : { phone },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = this.userRepository.create({
      email,
      phone,
      password: hashedPassword,
      firstName,
      lastName,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      phoneVerified: false,
    });

    await this.userRepository.save(user);

    // Generar tokens
    const tokens = await this.generateTokens(user);

    // Guardar refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { email, phone, password } = loginDto;

    // Validar que se proporcione al menos email o teléfono
    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required');
    }

    // Buscar usuario
    const user = await this.userRepository.findOne({
      where: email ? { email } : { phone },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar estado del usuario
    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedException('Account is blocked');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException('Account is suspended');
    }

    // Generar tokens
    const tokens = await this.generateTokens(user);

    // Guardar refresh token
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: undefined });
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, { refreshToken: hashedRefreshToken });
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
