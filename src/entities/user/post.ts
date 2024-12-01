import type { BasicCompanyEntity } from "./company";

export interface BasicPostEntity {
  id?: number;
  title?: string;
  description?: string;
  media_file_url?: string;
  company: BasicCompanyEntity;
}

export interface HashtagEntity {
  id?: number;
  name?: string;
}

export interface DataPostEntity {
  title?: string;
  description?: string;
  hashtag?: string[];
  media_file?: File;
}
