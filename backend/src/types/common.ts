type Meta = {
  page: number;
  limit: number;
  total: number;
};

type GenericResponse<T> = {
  meta: Meta;
  data: T;
};

type GenericErrorMessage = {
  path: string | number;
  message: string;
};

type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
};

type SearchTerm = { searchTerm?: string };

export {
  Meta,
  GenericResponse,
  GenericErrorMessage,
  GenericErrorResponse,
  SearchTerm,
};
