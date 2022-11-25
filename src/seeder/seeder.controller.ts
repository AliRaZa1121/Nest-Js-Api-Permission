import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Seeder")
@Controller("seeder")
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get("run/seeder")
  findAll() {
    return this.seederService.runSeeder();
  }

  @Get("run/permission/seeder")
  runPermissionSeeder() {
    return this.seederService.runPermissionSeeder();
  }
}
