import type { OptionSelect } from "~/entities/common";
import { OPTION_ALL } from "./common";

/**
 * Job status
 */
export const JOB_STATUS_DRAFT: number = 0;
export const JOB_STATUS_PUBLISH: number = 1;
export const JOB_STATUS_CLOSED: number = 2;

export const JOB_STATUS = {
  [JOB_STATUS_PUBLISH]: "Publish",
  [JOB_STATUS_CLOSED]: "Closed",
  [JOB_STATUS_DRAFT]: "Draft",
};

export const JOB_STATUS_OPTIONS = [
  { name: JOB_STATUS[JOB_STATUS_DRAFT], id: JOB_STATUS_DRAFT },
  { name: JOB_STATUS[JOB_STATUS_PUBLISH], id: JOB_STATUS_PUBLISH },
  { name: JOB_STATUS[JOB_STATUS_CLOSED], id: JOB_STATUS_CLOSED },
];

/**
 * Employee type
 */
export const FULL_TIME: number = 0;
export const PART_TIME: number = 1;
export const CONTRACT: number = 2;
export const OUT_SOURCED: number = 3;

export const TYPE_OF_EMPLOYEE = {
  [FULL_TIME]: "Full time",
  [PART_TIME]: "Part time",
  [CONTRACT]: "Contract",
  [OUT_SOURCED]: "Out sourced",
};

export const TYPE_OF_EMPLOYEE_OPTIONS: OptionSelect[] = [
  OPTION_ALL,
  { name: TYPE_OF_EMPLOYEE[FULL_TIME], id: FULL_TIME },
  { name: TYPE_OF_EMPLOYEE[PART_TIME], id: PART_TIME },
  { name: TYPE_OF_EMPLOYEE[CONTRACT], id: CONTRACT },
  { name: TYPE_OF_EMPLOYEE[OUT_SOURCED], id: OUT_SOURCED },
];

/**
 * Interview type
 */
export const INTERVIEW_ONLINE: number = 0;
export const INTERVIEW_OFFLINE: number = 1;

export const INTERVIEW_TYPE = {
  [INTERVIEW_ONLINE]: "Online",
  [INTERVIEW_OFFLINE]: "Offline",
};

export const INTERVIEW_TYPE_OPTIONS = [
  { id: INTERVIEW_ONLINE, name: INTERVIEW_TYPE[INTERVIEW_ONLINE] },
  { id: INTERVIEW_OFFLINE, name: INTERVIEW_TYPE[INTERVIEW_OFFLINE] },
];

/**
 * For user search
 */
export const ORDER_BY_CLOSE_DATE = "closeDate";
export const ORDER_BY_DATE_POST = "createAt";

export const ORDER_BY_TYPE = {
  [ORDER_BY_CLOSE_DATE]: "Close date",
  [ORDER_BY_DATE_POST]: "Date post",
};

export const ORDER_BY_TYPE_OPTIONS: { id: string; name: string }[] = [
  { id: ORDER_BY_CLOSE_DATE, name: ORDER_BY_TYPE[ORDER_BY_CLOSE_DATE] },
  { id: ORDER_BY_DATE_POST, name: ORDER_BY_TYPE[ORDER_BY_DATE_POST] },
];
