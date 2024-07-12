interface Meta {
  page: number;
  limit: number;
  total: number;
}

interface GenericResponse<T> {
  meta: Meta;
  data: T;
}

interface GenericErrorMessage {
  path: string | number;
  message: string;
}

interface GenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
}

export { Meta, GenericResponse, GenericErrorMessage, GenericErrorResponse };
