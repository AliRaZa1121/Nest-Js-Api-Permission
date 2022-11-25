import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolesPermissionsModule } from './roles-permissions/roles-permissions.module';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { PermissionsGuard } from './guard/permission.guard';
import { AuthModule } from './users/auth/auth.module';
import { JwtStrategy } from './users/auth/jwt/jwt.strategy';
import configuration from './utilities/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
        synchronize: Boolean(process.env.SYNCHRONIZE),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      cache: true,
      load: [configuration],
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    MulterModule.register({
      dest: "./public/files",
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    JwtStrategy,
    AppService,

  ],
})
export class AppModule {}
