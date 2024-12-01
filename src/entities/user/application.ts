import type { BasicCompanyEntity } from "./user/company";
import type { BasicJobEntity } from "./job";

export interface ApplicationEntity {
  id?: number;
  userId?: number;
  jobId?: string;
  jobPosition: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  address?: string;
  detailAddress?: string;
  isMarried?: boolean;
  gender?: string;
  selfIntroduce?: string;
  lifeGoal?: string;
  jobTitle?: string;
  interviewStatus?: number;
  interviewType?: number;
  note?: string;
  interviewDateTime?: string;
  onboardDate?: string;
  job?: BasicJobEntity;
  company?: BasicCompanyEntity;
}
