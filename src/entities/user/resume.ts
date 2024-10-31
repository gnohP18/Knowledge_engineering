export interface BasicResumeEntity {
  id?: number;
  name?: string;
  is_draft?: boolean;
  media_file_id?: number;
  media_file_info?: MediaFileEntity;
}

export interface MediaFileEntity {
  id?: number;
  name?: string;
  url?: string;
  type?: number;
  width?: number;
  height?: number;
  description?: string;
  isDeleted?: boolean;
}
