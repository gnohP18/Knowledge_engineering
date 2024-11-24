export const POST_STATUS_DRAFT: number = 0;
export const POST_STATUS_PUBLISH: number = 1;
export const POST_STATUS_CLOSED: number = 2;

export const POST_STATUS = {
  [POST_STATUS_PUBLISH]: "Publish",
  [POST_STATUS_CLOSED]: "Closed",
  [POST_STATUS_DRAFT]: "Draft",
};

export const POST_STATUS_OPTIONS = [
  { id: POST_STATUS_PUBLISH, name: POST_STATUS[POST_STATUS_PUBLISH] },
  { id: POST_STATUS_CLOSED, name: POST_STATUS[POST_STATUS_CLOSED] },
  { id: POST_STATUS_DRAFT, name: POST_STATUS[POST_STATUS_DRAFT] },
];
