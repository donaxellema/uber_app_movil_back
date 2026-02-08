import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { TripsModule } from './modules/trips/trips.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { UsuariosModule } from './modules/src/usuarios/usuarios.module';
import { PersonasModule } from './modules/src/personas/personas.module';
import { ConductoresModule } from './modules/src/conductores/conductores.module';
import { PerfilesModule } from './modules/src/perfiles/perfiles.module';
import { CategoriasVehiculosModule } from './modules/src/categorias-vehiculos/categorias-vehiculos.module';
import { DivisasModule } from './modules/src/divisas/divisas.module';
import { DocumentosModule } from './modules/src/documentos/documentos.module';
import { NotificacionesModule } from './modules/src/notificaciones/notificaciones.module';
import { PagosViajeModule } from './modules/src/pagos_viaje/pagos_viaje.module';
import { PushTokensModule } from './modules/src/push_tokens/push_tokens.module';
import { RatingsModule } from './modules/src/ratings/ratings.module';
import { ReclamosModule } from './modules/src/reclamos/reclamos.module';
import { VehiculosModule } from './modules/src/vehiculos/vehiculos.module';
import { ViajeModule } from './modules/src/viaje/viaje.module';

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
    UsuariosModule,
    PersonasModule,
    ConductoresModule,
    PerfilesModule,
    CategoriasVehiculosModule,
    DivisasModule,
    DocumentosModule,
    NotificacionesModule,
    PagosViajeModule,
    PushTokensModule,
    RatingsModule,
    ReclamosModule,
    VehiculosModule,
    ViajeModule,
    DriversModule,
    TripsModule,
    GatewayModule,
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
export class AppModule { }
