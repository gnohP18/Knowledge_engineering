export interface MenuItemEntity {
  icon?: string;
  label?: string;
}

export interface OptionSelect {
  id: number;
  name: string;
}
export interface PartialSelectedNode {
  checked: boolean;
  partialChecked: boolean;
}

export interface QueryParamsEntity {
  page?: string;
  limit?: string;
  status?: string;
  keyword?: string;
}
