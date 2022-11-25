import { Inject, Injectable } from "@nestjs/common";
import { PermissionsService } from "./permissions/permissions.service";

@Injectable()
export class AppService {
  constructor(
    @Inject(PermissionsService) private _permissionsService: PermissionsService
  ) {}

  // async runMigrations(_app) {
  //   const server = _app.getHttpServer();
  //   const router = server._events.request._router;

  //   const availableRoutes: [] = router.stack
  //     .map(
  //       (layer: {
  //         route: { path: any; regexp: string; stack: { method: any }[] };
  //       }) => {
  //         if (layer.route) {
  //           console.log(layer.route);
  //           return {
  //             route: {
  //               path: layer.route?.path,
  //               method: layer.route?.stack[0].method,
  //             },
  //           };
  //         }
  //       }
  //     )
  //     .filter((item: any) => item !== undefined);
  //   const allRoutes = availableRoutes.map(async (availableRouteSingle: any) => {
  //     const permissions = await this._permissionsService.runMigrations(
  //       availableRouteSingle
  //     );
  //   });
  // }
}
