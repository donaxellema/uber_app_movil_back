import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@GetUser() user: User & { refreshToken: string }) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('id') userId: string) {
    await this.authService.logout(userId);
    return { message: 'Logged out successfully' };
  }
}
