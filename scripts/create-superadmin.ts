import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/modules/users/users.service';
import { UserRole } from '../src/common/enums';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const admin = await usersService.createAdmin({
      email: 'maurial_593@hotmail.com',
      password: '741236985',
      firstName: 'Mauricio',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
    });
    console.log('Super Administrador creado exitosamente:', admin.email);
  } catch (error: any) {
    if (error.response?.message === 'User with that email already exists') {
      console.log('El usuario ya existe en la base de datos.');
    } else {
      console.error('Error al crear el superadmin:', error);
    }
  }

  await app.close();
}

bootstrap();
