export interface UserLoginEntity {
  email?: string;
  password?: string;
}
export interface UserSignupEntity {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  job_position?: number;
  address?: string;
  detail_address?: string;
  password_confirmation?: string;
}
