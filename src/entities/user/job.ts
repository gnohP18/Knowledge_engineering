import type { BasicCompanyEntity } from "./company";

export interface JobEntity {
  id?: number;
  title?: string;
  description?: string;
  salary_from?: number;
  salary_upto?: number;
  number_of_position?: number;
  position_name?: string;
  type_of_employee?: number;
  working_time?: string;
  expected_onboard_date?: string;
  close_date?: string;
  address?: string;
  interview_type?: number;
  is_applied?: boolean;
  number_of_applicants?: number;
  job_attribute?: string[];
  company: BasicCompanyEntity;
}

export interface BasicJobEntity {
  id?: number;
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

export interface SearchingJobEntity {
  id?: number;
  title?: string;
  description?: string;
  salary_from?: number;
  salary_upto?: number;
  position_name?: string;
  type_of_employee?: string;
  vacancy?: number;
  address?: string;
  interview_type?: string;
  company_id?: string;
  company_name?: string;
  company_type?: string;
  company_address?: string;
  company_size?: number;
  company_logo?: string;
}

export interface AttachmentJob {
  id?: number;
  title?: string;
  salary_from?: number;
  salary_upto?: number;
  vacancy?: number;
  position_name?: number;
  type_of_employee?: number;
  address?: string;
}
