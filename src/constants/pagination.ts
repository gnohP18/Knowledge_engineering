export const PAGE_DEFAULT = "1";
export const PAGE_LIMIT_DEFAULT = "10";
export const PER_PAGE_OPTIONS_DEFAULT = [15, 25, 50];
export const PAGE_LINK_SIZE = 5;

export interface QueryParamsEntity {
  page?: string;
  limit?: string;
}
