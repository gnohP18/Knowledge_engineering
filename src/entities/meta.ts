export interface MetaLinkEntity {
  url: String | null;
  label: String | null;
  active: Boolean;
}

export interface MetaEntity {
  current_page: Number;
  from: Number;
  last_page: Number;
  links: Array<MetaLinkEntity>;
  path: String;
  per_page: Number;
  to: Number;
  total: Number;
}
