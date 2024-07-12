import {
  PaginationOptions,
  PaginationOptionsResponse,
} from '../interfaces/pagination';

const calculatePagination = (
  paginationOptions: PaginationOptions,
): PaginationOptionsResponse => {
  const page = Number(paginationOptions.page ?? 1);
  const limit = Number(paginationOptions.limit ?? 10);
  const skip = (page - 1) * limit;
  const sortBy = paginationOptions.sortBy ?? 'createdAt';
  const sortOrder = paginationOptions.sortOrder ?? 'desc';

  return { page, limit, skip, sortBy, sortOrder };
};

export default calculatePagination;
