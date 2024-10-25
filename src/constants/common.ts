import type { OptionSelect } from "~/entities/common";

export const DEFAULT_AVATAR_URL = "/images/default_avatar.jpeg";

export const LIMIT_NAME_CHARACTERS = 30;

export const CONNECTOR_TYPE_COMPANY = "COMPANY";
export const CONNECTOR_TYPE_USER = "USER";
export const CONNECTOR_TYPE = {
  [CONNECTOR_TYPE_COMPANY]: "Company",
  [CONNECTOR_TYPE_USER]: "User",
};

export const MODE_FORM_CREATE = "CREATE";
export const MODE_FORM_UPDATE = "UPDATE";
export const MODE_USER_VIEW = "USER";
export const MODE_COMPANY_VIEW = "COMPANY";

export const COMMON_ACTIVE: number = 0;
export const COMMON_INACTIVE: number = 0;

export const COMMON_STATUS = {
  [COMMON_ACTIVE]: 'Active',
  [COMMON_INACTIVE]: 'Inactive'
}

export const COMMON_STATUS_OPTIONS: OptionSelect[] = [
  { id: COMMON_ACTIVE, name: COMMON_STATUS[COMMON_ACTIVE] },
  { id: COMMON_INACTIVE, name: COMMON_STATUS[COMMON_INACTIVE] }
]
