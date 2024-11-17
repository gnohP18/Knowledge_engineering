import type { OptionSelect } from "~/entities/common";

/**
 * For image
 */
export const DEFAULT_AVATAR_URL = "/images/default_avatar.jpeg";
export const DEFAULT_FILE_URL = "/images/default_file.jpeg";

/**
 * For upload
 */
export const IMAGE_ACCEPT_TYPE = "image/jpg,image/jpeg,image/gif,image/png";
export const FILE_ACCEPT_TYPE =
  "application/pdf, application/doc, application/docx";
export const MEDIA_FILE_TYPE_RESUME: number = 1;
export const MEDIA_FILE_TYPE_IMAGE: number = 0;

/**
 * For string, limit
 */
export const LIMIT_NAME_CHARACTERS = 30;

/**
 * For connector
 * */
export const CONNECTOR_TYPE_COMPANY = 0;
export const CONNECTOR_TYPE_USER = 1;
export const CONNECTOR_TYPE = {
  [CONNECTOR_TYPE_COMPANY]: "Company",
  [CONNECTOR_TYPE_USER]: "User",
};

export const CONNECTOR_ACTION_CONNECT = 0;
export const CONNECTOR_ACTION_DISCONNECT = 2;
export const CONNECTOR_ACTION_BLOCK = 1;

// export const CONNECTOR_ACTION_TYPE

/**
 * For mode action
 */
export const MODE_FORM_CREATE = "CREATE";
export const MODE_FORM_UPDATE = "UPDATE";
export const MODE_USER_VIEW = "USER";
export const MODE_COMPANY_VIEW = "COMPANY";

/**
 * For common status
 */
export const COMMON_ACTIVE: number = 0;
export const COMMON_INACTIVE: number = 1;

export const COMMON_STATUS = {
  [COMMON_ACTIVE]: "Active",
  [COMMON_INACTIVE]: "Inactive",
};

export const COMMON_STATUS_OPTIONS: OptionSelect[] = [
  { id: COMMON_ACTIVE, name: COMMON_STATUS[COMMON_ACTIVE] },
  { id: COMMON_INACTIVE, name: COMMON_STATUS[COMMON_INACTIVE] },
];

/**
 * For search
 */
export const DIRECTION_ASC: string = "asc";
export const DIRECTION_DESC: string = "desc";

export const DIRECTION_TYPE = {
  [DIRECTION_ASC]: "Increasing",
  [DIRECTION_DESC]: "Decreasing",
};

export const DIRECTION_TYPE_OPTIONS: { id: string; name: string }[] = [
  { id: DIRECTION_ASC, name: DIRECTION_TYPE[DIRECTION_ASC] },
  { id: DIRECTION_DESC, name: DIRECTION_TYPE[DIRECTION_DESC] },
];

export const LIMIT_OBJECT_OPTIONS: { id: number; name: string }[] = [
  { id: 10, name: "10" },
  { id: 20, name: "20" },
  { id: 30, name: "30" },
];

export const OPTION_ALL: OptionSelect = { id: -1, name: "All" };

/**
 * For gender
 */

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 0;

export const GENDER = {
  [GENDER_MALE]: "Male",
  [GENDER_FEMALE]: "Female",
};
