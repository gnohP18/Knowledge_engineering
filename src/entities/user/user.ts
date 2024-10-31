export interface UserEntity {
  id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  avatar?: string;
  email?: string;
  address?: string;
  detail_address?: string;
  is_married?: boolean;
  gender?: number;
  self_introduce?: string;
  life_goal?: string;
  job_position?: number;
  hashtag: number[];
  connect_company: number[];
  connect_user: number[];
}

export interface ConnectorEntity {
  id?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  connector_type?: string;
  connector_position?: string;
}
