import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeORM con PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Módulos de la aplicación
    AuthModule,
    UsersModule,
    // DriversModule,
    // VehiclesModule,
    // TripsModule,
    // PaymentsModule,
    // RewardsModule,
    // ReferralsModule,
    // NotificationsModule,
    // AdminModule,
    // CurrencyModule,
    // MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
