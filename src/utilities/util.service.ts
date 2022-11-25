import { HttpStatus } from "@nestjs/common";
import { ErrorApiWrapperDto, ListingApiWrapperDto } from "./dto/util.dto";

export const listingApiWrapper = function (
  data = null,
  message = null,
  statusCode = 200
) {
  const listingApiWrapperDto: ListingApiWrapperDto = {
    message: message,
    statusCode: statusCode,
    data: data,
    jsonapi: { version: "1.0" },
    meta: { apiVersion: "1.0" },
  };
  return listingApiWrapperDto;
};

export function listingApiWrapperPaginate(
  data: any[],
  pagination: { page: any; take: any; total: any },
  statusCode = 200
) {
  const { page, take, total } = pagination;
  const lastPage = Math.ceil(total / take);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  const listingApiWrapperDto: ListingApiWrapperDto = {
    data: data,
    statusCode: statusCode,
    totalCount: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
    jsonapi: { version: "1.0" },
    meta: { apiVersion: "1.0" },
  };
  return listingApiWrapperDto;
}

export const errorApiWrapper = function (error: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
  const errorApiWrapperDto: ErrorApiWrapperDto = {
    error: error,
    statusCode: statusCode,
    jsonapi: { version: "1.0" },
    meta: { apiVersion: "1.0" },
  };
  return errorApiWrapperDto;
};
