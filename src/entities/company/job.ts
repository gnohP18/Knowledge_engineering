export interface BasicJobEntity {
  id?: string;
  title?: string;
  position_name?: string;
  vacancy?: string;
  status?: number;
  close_day?: string;
  created_at?: string;
}

export interface PositionNameEntity {
  id?: string;
  name?: string;
}
