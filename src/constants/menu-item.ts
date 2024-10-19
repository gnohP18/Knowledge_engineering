import type { MenuItem } from "primevue/menuitem";
import { 
  COMPANY_INTERVIEW, 
  COMPANY_INTERVIEW_SET_DATE, 
  COMPANY_INTERVIEW_UPDATE_STATUS, 
  COMPANY_JOB, COMPANY_JOB_CREATE, 
  COMPANY_POST, 
  COMPANY_POST_CREATE 
} from "./route";

export const MENU_ITEM_LEFT_BAR: MenuItem[] = [
  {
    label: "Profile",
    items: [
      {
        label: "Profile",
        icon: "pi pi-user",
        url: "/profile",
      },
    ],
  },
  {
    label: "Work",
    items: [
      {
        label: "Jobs",
        icon: "pi pi-briefcase",
      },
      {
        label: "Application",
        icon: "pi pi-file",
      },
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
    ],
  },
];

export const MENU_PROFILE: MenuItem[] = [
  {
    label: "Application",
    icon: "pi pi-file-export",
  },
  {
    label: "Resume",
    icon: "pi pi-file",
  },
  {
    label: "Profile",
    icon: "pi pi-user-edit",
  },
];

export const MENU_COMPANY: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/company",
  },
  {
    key: "posts",
    label: "Posts",
    icon: "pi pi-th-large",
    route: COMPANY_POST,

    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: COMPANY_POST_CREATE,
      }
    ],
  },
  {
    key: "jobs",
    label: "Jobs",
    icon: "pi pi-briefcase",
    route: COMPANY_JOB,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: COMPANY_JOB_CREATE,
      }
    ],
  },
  {
    key: "interviews",
    label: "Interview",
    icon: "pi pi-file",
    route: COMPANY_INTERVIEW,
    items: [
      {
        label: "Set date",
        icon: "pi pi-plus",
        route: COMPANY_INTERVIEW_SET_DATE,
      },
      {
        label: "Update status",
        icon: "pi pi-file-edit",
        route: COMPANY_INTERVIEW_UPDATE_STATUS,
      },
    ],
  },
];
