interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginationOptionsResponse {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

export { PaginationOptions, PaginationOptionsResponse };
