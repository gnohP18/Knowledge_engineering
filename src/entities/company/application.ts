import type { string } from "zod"

export interface BasicApplicationEntity {
  id?: number,
  first_name?: string,
  last_name?: string,
  position_name?: string,
  interview_type?: number,
  status?: number,
  interview_date_time?: number
}

export interface ApplicationEntity {
  id?: number,
  job_id?: number,
  job_name?: string,
  first_name?: string,
  last_name?: string,
  date_of_birth?: string,
  avatar?: string,
  email?: string,
  phone?: string,
  address?: string,
  detail_address?: string,
  is_married?: false,
  gender?: string,
  self_introduce?: string,
  life_goal?: string,
  job_title?: string,
  interview_status?: number,
  interview_type?: number,
  note?: string,
  interview_date_time?: string,
  onboard_date?: string,
  resume_name?: string,
  resume?: string
}