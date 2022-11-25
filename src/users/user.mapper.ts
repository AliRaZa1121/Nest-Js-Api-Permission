import { RolesPermission } from "src/roles-permissions/entities/roles-permission.entity";
import { Permissions } from "src/permissions/entities/permission.entity";
import { Roles } from "src/roles/roles.entity";
import { ResponseUserDto } from "./dto/reponse-dto";
import { User } from "./entities/user.entity";

export const loginMapper = (payload: { token: any; user: any }) => {
  const { user, token } = payload;
  return {
    token: token,
    user: {
      id: user.id,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user.role_id == null ? null : roleSingleMapper(user.role_id),
      userPermissions:
        user.roles_permissions == null
          ? []
          : rolePermissionsMapper(user.roles_permissions),
    },
  };
};

export const rolePermissionsMapper = (rolePermissions: RolesPermission[]) => {
  if (rolePermissions.length > 0) {
    const modifyrolePermissions = rolePermissions.map((rolePermission) => {
      const modifyrolePermission = {
        id: rolePermission?.id,
        user_id: rolePermission?.user_id,
        permissions:
          rolePermission.permission_id == null
            ? []
            : permissionsMapper(rolePermission.permission_id),
      };
      return modifyrolePermission;
    });
    return modifyrolePermissions;
  }
  return rolePermissions;
};

export const permissionsMapper = (permission: Permissions) => {
  return {
    attributes: {
      name: permission?.name,
      slug: permission?.slug,
      group: permission?.group,
      createdAt: permission?.created_at,
      updatedAt: permission?.updated_at,
    },
    id: permission.id,
  };
};
export const relationMapper = function (users = []) {
  if (users.length > 0) {
    const modifyUser = users.map((relation) => {
      return {
        attributes: {
          name:
            relation.first_name && relation.last_name
              ? relation.first_name + " " + relation.last_name
              : relation.organization_name,
          contact_type: relation.contact_type,
          date_added: relation.date_added,
          status: relation.status,
          comment: relation.comment,
        },
        id: relation.id.toString(),
      };
    });
    return modifyUser;
  }
  return users;
};

export const singleUserListingMaper = function (user: User) {
  return {
    attributes: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user.role_id == null ? null : roleSingleMapper(user.role_id),
    },
    id: user.id.toString(),
  };
};

export const usersListingMapper = function (users = []) {
  if (users.length > 0) {
    const modifyusers = users.map((user) => {
      const modifyUser: ResponseUserDto = {
        attributes: {
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
          status: user?.status,
          createdAt: user?.created_at,
          updatedAt: user?.updated_at,
          role: user.role_id == null ? null : roleSingleMapper(user.role_id),
        },
        id: user?.id,
      };
      return modifyUser;
    });
    return modifyusers;
  }
  return users;
};

export const userSingleMapper = function (user: User) {
  const data: ResponseUserDto = {
    attributes: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user?.role_id == null ? null : roleSingleMapper(user.role_id),
      userPermissions:
        user?.roles_permissions == null
          ? []
          : rolePermissionsMapper(user.roles_permissions),
    },
    id: user?.id,
  };

  return data;
};

export const userAuthMeMapper = (user: User) => {
  const data = {
    firstName: user?.first_name,
    lastName: user?.last_name,
    email: user?.email,
    status: user?.status,
    createdAt: user?.created_at,
    updatedAt: user?.updated_at,
    role: user?.role_id == null ? null : roleSingleMapper(user.role_id),
    userPermissions:
      user?.roles_permissions == null
        ? []
        : rolePermissionsMapper(user.roles_permissions),
    id: user?.id,
  };

  return data;
};

export const roleSingleMapper = function (role: Roles) {
  const data = {
    id: role?.id,
    name: role?.name,
    type: role?.type,
    slug: role?.slug,
    canLogin: role?.can_login,
    isContact: role?.is_contact,
  };
  return data;
};

export const filesListingMapper = function (files = []) {
  if (files.length > 0) {
    const modifyFiles = files.map((file) => {
      const modifyFile = {
        url: file,
        name: makeTitle(file?.split("/").pop()).split(".")[0],
      };
      return modifyFile;
    });
    return modifyFiles;
  }
  return files;
};

function makeTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export const userListingMapperForAuditor = function (users = []) {
  if (users.length > 0) {
    const modifyusers = users.map((user) => {
      const modifyUser = {
        attributes: {
          firstName: user?.user_id?.first_name,
          lastName: user?.user_id?.last_name,
          email: user?.user_id?.email,
          status: user?.user_id?.status,
          createdAt: user?.user_id?.created_at,
          updatedAt: user?.user_id?.updated_at,
        },
        id: user?.user_id?.id,
      };
      return modifyUser;
    });
    return modifyusers;
  }
  return users;
};
