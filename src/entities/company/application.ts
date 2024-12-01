export interface BasicApplicationEntity {
  id?: number;
  first_name?: string;
  last_name?: string;
  position_name?: string;
  interview_type?: number;
  status?: number;
  interview_date_time?: number;
}

export interface ApplicationEntity {
  id?: number;
  jobId?: number;
  jobPositionName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: string;
  detailAddress?: string;
  isMarried?: false;
  gender?: number;
  selfIntroduce?: string;
  lifeGoal?: string;
  jobTitle?: string;
  interviewStatus?: number;
  interviewType?: number;
  note?: string;
  interviewDateTime?: string;
  onboardDate?: string;
  resume?: {
    id?: string;
    url?: string;
    name?: string;
  };
}

export interface BasicApplicationEntity {
  avatar: string;
  email: string;
  firstName: string;
  interviewDateTime: string;
  interviewStatus: number;
  jobId: number;
  jobPositionName: string;
  lastName: string;
  updatedAt: string;
  userId: number;
}
