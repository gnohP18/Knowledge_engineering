/**
 * Job status
 */
export const JOB_STATUS_DRAFT: number = 0;
export const JOB_STATUS_PUBLISH: number = 1;
export const JOB_STATUS_CLOSED: number = 2;

export const JOB_STATUS = {
  [JOB_STATUS_PUBLISH]: 'Publish',
  [JOB_STATUS_CLOSED]: 'Closed',
  [JOB_STATUS_DRAFT]: 'Draft',
}

export const JOB_STATUS_OPTIONS = [
  { name: JOB_STATUS[JOB_STATUS_DRAFT], id: String(JOB_STATUS_DRAFT) },
  { name: JOB_STATUS[JOB_STATUS_PUBLISH], id: String(JOB_STATUS_PUBLISH) },
  { name: JOB_STATUS[JOB_STATUS_CLOSED], id: String(JOB_STATUS_CLOSED) },
];

/**
 * Employee type
 */
export const FULL_TIME: number = 0;
export const PART_TIME: number = 1;
export const CONTRACT: number = 2;
export const OUT_SOURCED: number = 3;

export const TYPE_OF_EMPLOYEE = {
  [FULL_TIME]: 'Full time',
  [PART_TIME]: 'Part time',
  [CONTRACT]: 'Contract',
  [OUT_SOURCED]: 'Out sourced'
}

export const TYPE_OF_EMPLOYEE_OPTIONS = [
  { name: TYPE_OF_EMPLOYEE[FULL_TIME], id: String(FULL_TIME) },
  { name: TYPE_OF_EMPLOYEE[PART_TIME], id: String(PART_TIME) },
  { name: TYPE_OF_EMPLOYEE[CONTRACT], id: String(CONTRACT) },
  { name: TYPE_OF_EMPLOYEE[OUT_SOURCED], id: String(OUT_SOURCED) },  
]

/**
 * Interview type
 */
export const INTERVIEW_ONLINE: number = 0; 
export const INTERVIEW_OFFLINE: number = 1;

export const INTERVIEW_TYPE = {
  [INTERVIEW_ONLINE]: 'Online',
  [INTERVIEW_OFFLINE]: 'Offline',
}

export const INTERVIEW_TYPE_OPTIONS = [
  { id: String(INTERVIEW_ONLINE), name: INTERVIEW_TYPE[INTERVIEW_ONLINE] },
  { id: String(INTERVIEW_OFFLINE), name: INTERVIEW_TYPE[INTERVIEW_OFFLINE] }
]