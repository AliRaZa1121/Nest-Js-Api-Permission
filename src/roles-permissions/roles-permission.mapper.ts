import { Roles } from 'src/roles/roles.entity';
import { ResponseRolesPermisionDto } from './dto/create-roles-permission.dto';
import { RolesPermission } from './entities/roles-permission.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';

export const rolesPermisionListingMapper = function (role_permissions = []) {

    if (role_permissions.length > 0) {
        const modifyRolesPermisions = role_permissions.map((role_permission) => {
            const modifyRolesPermision: ResponseRolesPermisionDto = {
                attributes: {
                    permission: (role_permission.permission_id == null) ? null : permissionSingleMapper(role_permission.permission_id),
                    user: (role_permission.user_id == null) ? null : userMapper(role_permission.user_id),
                    createdAt: role_permission?.created_at,
                    updatedAt: role_permission?.updated_at,
                },
                id: role_permission?.id,
            };
            return modifyRolesPermision;
        });
        return modifyRolesPermisions;
    }
    return role_permissions;
};


export const rolesPermisionSingleMapper = function (role_permission: RolesPermission) {
    const data: ResponseRolesPermisionDto = {
        attributes: {
            permission: (role_permission.permission_id == null) ? null : permissionSingleMapper(role_permission.permission_id),
            user: (role_permission.user_id == null) ? null : userMapper(role_permission.user_id),
            createdAt: role_permission?.created_at,
            updatedAt: role_permission?.updated_at,
        },
        id: role_permission?.id,
    };
    return data;
};

export const userMapper = function (user: User) {
    const data = {
        id: user?.id,
        name: user.first_name && user.last_name ? user.first_name + " " + user.last_name : null,
    };
    return data;
};

export const permissionSingleMapper = function (permission: Permissions) {
    const data = {
        id: permission?.id,
        name: permission?.name,
        slug: permission?.slug,
        createdAt: permission?.created_at,
        updatedAt: permission?.updated_at,
    };
    return data;
};
