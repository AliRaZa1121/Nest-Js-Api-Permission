import { forwardRef, Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles-permissions.service';
import { RolesPermissionsController } from './roles-permissions.controller';
import { RolesPermissionsRepository } from './roles-permissions.repository'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesPermissionsRepository]),
    PermissionsModule
  ],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  exports: [RolesPermissionsService,TypeOrmModule.forFeature([RolesPermissionsRepository])]
})
export class RolesPermissionsModule { }
