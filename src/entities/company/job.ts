export interface BasicJobEntity {
  id?: string;
  title?: string;
  position_name?: string;
  number_of_position?: number;
  status?: number;
  close_day?: string;
  created_at?: string;
}

export interface PositionNameEntity {
  id?: number;
  name?: string;
}

export interface AttributeTypeEntity {
  id?: string;
  name?: string;
  job_attributes?: JobAttributeEntity[];
}

export interface JobAttributeEntity {
  id?: string;
  name?: string;
  parent_id?: string;
  attribute_type_id?: string;
  job_attribute: JobAttributeEntity[];
}

export interface JobEntity {
  id?: string;
  title?: string;
  position_id?: number;
  status?: number;
  description?: string;
  type_of_employee?: number;
  number_of_position?: number;
  working_time?: string;
  expected_onboard_date?: string;
  close_date?: string;
  address?: string;
  interview_type?: number;
  job_attribute?: string[];
}
