import { IsNotEmpty } from "class-validator";

export class ListingApiWrapperDto {
  message?: string;
  data: any;
  @IsNotEmpty()
  statusCode: number;

  totalCount?: number; //
  currentPage?: number;
  nextPage?: number;
  prevPage?: number;
  lastPage?: number;
  
  @IsNotEmpty()
  jsonapi: {
    version: string;
  };

  @IsNotEmpty()
  meta: {
    apiVersion: string;
  };
}

export class ErrorApiWrapperDto {
  error: any;

  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  jsonapi: {
    version: string;
  };

  @IsNotEmpty()
  meta: {
    apiVersion: string;
  };
}
