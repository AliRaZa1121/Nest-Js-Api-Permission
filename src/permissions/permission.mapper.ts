import { ResponsePermissionDto } from "./dto/create-permission.dto";
import { Permissions } from "./entities/permission.entity";
import * as _ from "lodash";

export const permissionListingMapper = function (
  permissions: Permissions[] = []
) {
  const grouped = _.groupBy(permissions, (permission) => permission.group);
  return grouped;
};

export const permissionSingleMapper = function (permissions: Permissions) {
  const data: ResponsePermissionDto = {
    attributes: {
      name: permissions?.name,
      slug: permissions?.slug,
      group: permissions?.group,
      createdAt: permissions?.created_at,
      updatedAt: permissions?.updated_at,
    },
    id: permissions?.id,
  };
  return data;
};
