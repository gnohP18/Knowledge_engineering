import type { BasicCompanyEntity } from "./company";

export interface JobEntity {
  id?: string;
  title?: string;
  description?: string;
  salary_from?: number;
  salary_upto?: number;
  number_of_position?: number;
  position_name?: string;
  type_of_employee?: string;
  working_time?: string;
  expected_onboard_date?: string;
  close_date?: string;
  company_id?: string;
  address?: string;
  hashtag?: string[];
  interview_type?: string;
  media_file_id?: string;
}

export interface BasicJobEntity {
  id?: string;
  title?: string;
  description?: string;
  salary_from?: number;
  salary_upto?: number;
  position_name?: string;
  type_of_employee?: string;
  vacancy?: number;
  address?: string;
  hashtag?: number[];
  interview_type?: string;
  company?: BasicCompanyEntity;
}
