export interface BasicPostEntity {
  id?: number;
  title?: string;
  content?: string;
  company_avatar?: string;
  thumbnail?: string;
  company_name?: string;
  updated_at?: string;
}

export interface HashtagEntity {
  id?: number;
  name?: string;
}

export interface DataPostEntity {
  title?: string;
  description?: string;
  hashtag_id?: number[];
  media_file?: File;
}
