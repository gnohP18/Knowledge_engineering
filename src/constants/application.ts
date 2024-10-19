export const SUBMITTED = 0;
export const WATCHED = 1;
export const INTERVIEW_DATE_SET = 2;
export const INTERVIEW_IN_PROGRESS = 3;
export const HIRED = 4;
export const REJECTED = 5;
export const OFFER_DECISION = 6;
export const ACCEPT_OFFER = 7;
export const REJECT_OFFER = 8;
export const ONBOARD_DATE_SET = 9;
export const COMPLETED = 10;

export const INTERVIEW_STATUS_NAME = {
  [SUBMITTED]: "Submitted",
  [WATCHED]: "Watched",
  [INTERVIEW_DATE_SET]: "Interview date set",
  [INTERVIEW_IN_PROGRESS]: "Interview in progress",
  [HIRED]: "Hired",
  [REJECTED]: "Rejected",
  [OFFER_DECISION]: "Offered decision",
  [ACCEPT_OFFER]: "Accepted offer",
  [REJECT_OFFER]: "Rejected offer",
  [ONBOARD_DATE_SET]: "Onboard date set",
  [COMPLETED]: "Completed",
};

export const INTERVIEW_ONLINE = 1;
export const INTERVIEW_OFFLINE = 2;

export const INTERVIEW_TYPE = {
  [INTERVIEW_ONLINE]: "Interview Online",
  [INTERVIEW_OFFLINE]: "Interview Offline",
};
