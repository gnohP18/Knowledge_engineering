import type { PositionEntity } from "./job";

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
  job_position?: PositionEntity;
  hashtag?: number[];
  total_connects?: number;
}

export interface DataUserEntity {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  avatar?: File;
  email?: string;
  address?: string;
  detail_address?: string;
  is_married?: boolean;
  gender?: number;
  self_introduce?: string;
  life_goal?: string;
  job_position?: number;
  hashtag?: number[];
}

export interface ConnectorEntity {
  type?: number;
  id?: number;
  name?: string;
  avatar?: string;
  job_position?: PositionEntity;
}
