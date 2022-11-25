import {
    Injectable,
    CanActivate,
    ExecutionContext,
    SetMetadata,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
         private reflector: Reflector,
          private userService: UsersService,
         ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.checkPermissions(id);
            if (user?.role_id && user.role_id.slug === 'admin') {
                return true;
            }
            else if (user?.roles_permissions.length > 0) {
                const checkIfPermissionExist = user.roles_permissions.filter(roles_permission => {
                    return permissions.includes(roles_permission.permission_id.slug);
                });
                Object.keys(checkIfPermissionExist).length === 0 ? false : true;
            }
            else {
                return false;
            }
        }
        return true;
    }


}



