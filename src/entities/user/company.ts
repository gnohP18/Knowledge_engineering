export interface CompanyEntity {
  id?: number;
  name?: string;
  name_in_charge?: string;
  phone?: string;
  email?: string;
  logo?: string;
  company_type?: number;
  address?: string;
  detail_address?: string;
  size?: number;
  accessibility?: string;
  closed_day?: string;
  business_day?: string;
  connect_company?: number[];
  connect_user?: number[];
  status?: string;
  relationship_type?: number;
  relationship_id?: number;
  company?: BasicCompanyEntity[];
}

export interface BasicCompanyEntity {
  id?: string;
  name?: string;
  company_type?: number;
  address?: string;
  size?: number;
  logo?: string;
}
