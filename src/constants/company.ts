/**
 * For company type
 */
export const COMPANY_TYPE_TECH = 0;
export const COMPANY_TYPE_HEALTH_CARE = 1;
export const COMPANY_TYPE_FINANCIAL = 2;
export const COMPANY_TYPE_MANUFACTURING = 3;

export const COMPANY_TYPE = {
  [COMPANY_TYPE_TECH]: "Technology",
  [COMPANY_TYPE_HEALTH_CARE]: "Health care",
  [COMPANY_TYPE_FINANCIAL]: "Financial",
  [COMPANY_TYPE_MANUFACTURING]: "Manufacturing",
};

export const COMPANY_TYPE_OPTIONS = [
  { id: COMPANY_TYPE_TECH, name: COMPANY_TYPE[COMPANY_TYPE_TECH] },
  {
    id: COMPANY_TYPE_HEALTH_CARE,
    name: COMPANY_TYPE[COMPANY_TYPE_HEALTH_CARE],
  },
  { id: COMPANY_TYPE_FINANCIAL, name: COMPANY_TYPE[COMPANY_TYPE_FINANCIAL] },
  {
    id: COMPANY_TYPE_MANUFACTURING,
    name: COMPANY_TYPE[COMPANY_TYPE_MANUFACTURING],
  },
];

/**
 * For company workplace
 */

export const COMPANY_WORKPLACE_INDUSTRIAL_ZONE = 1;
export const COMPANY_WORKPLACE_INTERNATIONAL = 2;
export const COMPANY_WORKPLACE_REMOTE_LOCATION = 3;
export const COMPANY_WORKPLACE_RURAL_AREA = 4;
export const COMPANY_WORKPLACE_URBAN_AREA = 5;

export const COMPANY_WORKPLACE = {
  [COMPANY_WORKPLACE_INDUSTRIAL_ZONE]: "Industrial Zone",
  [COMPANY_WORKPLACE_INTERNATIONAL]: "International",
  [COMPANY_WORKPLACE_REMOTE_LOCATION]: "Remote Location",
  [COMPANY_WORKPLACE_RURAL_AREA]: "Rural Area",
  [COMPANY_WORKPLACE_URBAN_AREA]: "Urban Area",
};

export const COMPANY_WORKPLACE_OPTIONS = [
  {
    id: COMPANY_WORKPLACE_INDUSTRIAL_ZONE,
    name: COMPANY_WORKPLACE[COMPANY_WORKPLACE_INDUSTRIAL_ZONE],
  },
  {
    id: COMPANY_WORKPLACE_INTERNATIONAL,
    name: COMPANY_WORKPLACE[COMPANY_WORKPLACE_INTERNATIONAL],
  },
  {
    id: COMPANY_WORKPLACE_REMOTE_LOCATION,
    name: COMPANY_WORKPLACE[COMPANY_WORKPLACE_REMOTE_LOCATION],
  },
  {
    id: COMPANY_WORKPLACE_RURAL_AREA,
    name: COMPANY_WORKPLACE[COMPANY_WORKPLACE_RURAL_AREA],
  },
  {
    id: COMPANY_WORKPLACE_URBAN_AREA,
    name: COMPANY_WORKPLACE[COMPANY_WORKPLACE_URBAN_AREA],
  },
];
