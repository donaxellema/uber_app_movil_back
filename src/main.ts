import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurar CORS
  app.enableCors({
    origin: '*',
    credentials: false,
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interceptor global de éxito
  app.useGlobalInterceptors(new SuccessInterceptor());

  // Prefijo global de la API
  app.setGlobalPrefix('api/v1');

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 Skyfast Backend running on: http://localhost:${port}/api/v1`);
  console.log(`🗄️  Database: ${configService.get('DB_DATABASE')}`);
  console.log(`📡 Environment: ${configService.get('NODE_ENV')}`);
}
bootstrap();
