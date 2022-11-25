import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AllowAny } from "src/guard/jwt-auth.guard";
import { PermissionsGuard } from "src/guard/permission.guard";
import { Permissions } from "./permissions.decorator";




export function ApiAuthPermission(isAuth = true, permission: string = null) {
    if (isAuth && permission !== null) {
        return applyDecorators(
            UseGuards(AuthGuard('jwt')),
            UseGuards(PermissionsGuard),
            ApiBearerAuth('JWT'),
            Permissions(permission)
        );
    } else if (isAuth) {
        return applyDecorators(
            UseGuards(AuthGuard('jwt')),
            ApiBearerAuth('JWT')
        );
    } else {
        return applyDecorators(
            AllowAny(),
        );
    }
}
