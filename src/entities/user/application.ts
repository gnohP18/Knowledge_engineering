import type { BasicCompanyEntity } from "./user/company";
import type { BasicJobEntity } from "./job";

export interface ApplicationEntity {
  id?: string;
  job_id?: string;
  job_name: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  address?: string;
  detail_address?: string;
  is_married?: boolean;
  gender?: string;
  self_introduce?: string;
  life_goal?: string;
  job_title?: string;
  interview_status?: number;
  interview_type?: number;
  note?: string;
  interview_date_time?: string;
  onboard_date?: string;
  job?: BasicJobEntity;
  company?: BasicCompanyEntity;
}
