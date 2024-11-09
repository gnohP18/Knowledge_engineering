import type { OptionSelect } from "~/entities/common";

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
  [INTERVIEW_ONLINE]: "Online",
  [INTERVIEW_OFFLINE]: "Offline",
};

export const INTERVIEW_STATUS_OPTIONS: OptionSelect[] = [
  { id: WATCHED, name: INTERVIEW_STATUS_NAME[WATCHED] },
  { id: INTERVIEW_DATE_SET, name: INTERVIEW_STATUS_NAME[INTERVIEW_DATE_SET] },
  {
    id: INTERVIEW_IN_PROGRESS,
    name: INTERVIEW_STATUS_NAME[INTERVIEW_IN_PROGRESS],
  },
  { id: HIRED, name: INTERVIEW_STATUS_NAME[HIRED] },
  { id: REJECTED, name: INTERVIEW_STATUS_NAME[REJECTED] },
  { id: OFFER_DECISION, name: INTERVIEW_STATUS_NAME[OFFER_DECISION] },
  { id: ACCEPT_OFFER, name: INTERVIEW_STATUS_NAME[ACCEPT_OFFER] },
  { id: REJECT_OFFER, name: INTERVIEW_STATUS_NAME[REJECT_OFFER] },
  { id: ONBOARD_DATE_SET, name: INTERVIEW_STATUS_NAME[ONBOARD_DATE_SET] },
  { id: COMPLETED, name: INTERVIEW_STATUS_NAME[COMPLETED] },
];
