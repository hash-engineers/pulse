/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';

class QueryBuilder<T> {
  private model: any;
  private searchQuery: Record<string, unknown>;
  private filters: any;
  private sortBy!: string;
  private sortOrder!: Prisma.SortOrder;
  private page: number;
  private limit: number;
  private selectedFields: any;

  constructor(model: any, query: Record<string, unknown>) {
    this.model = model;
    this.searchQuery = query;
    this.filters = {};
    this.page = 1;
    this.limit = 10;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.searchQuery.searchTerm as string;
    if (searchTerm) {
      this.filters.OR = searchableFields.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      }));
    }

    return this;
  }

  filter(whereFilters: Record<string, unknown>[]) {
    this.filters = {
      ...this.filters,
      AND: whereFilters,
    };
    return this;
  }

  sort([defaultSortBy, defaultSortOrder]: string[]) {
    const sortBy = (this.searchQuery.sortBy as string) || defaultSortBy;
    const sortOrder =
      (this.searchQuery.sortOrder as Prisma.SortOrder) || defaultSortOrder;
    if (sortBy) {
      this.sortBy = sortBy;
    }
    if (sortOrder) {
      this.sortOrder = sortOrder;
    }
    return this;
  }

  paginate() {
    this.page = Number(this.searchQuery.page) || 1;
    this.limit = Number(this.searchQuery.limit) || 10;
    return this;
  }

  select(fields: string[]) {
    this.selectedFields = fields.reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    return this;
  }

  async execute() {
    const skip = (this.page - 1) * this.limit;

    const result = await this.model.findMany({
      where: this.filters,
      skip,
      take: this.limit,
      orderBy: { [this.sortBy]: this.sortOrder },
      select: this.selectedFields,
    });

    const total = await this.model.count({
      where: this.filters,
    });

    const totalPages = Math.ceil(total / this.limit);

    return {
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages,
      },
      data: result,
    };
  }
}

export default QueryBuilder;
