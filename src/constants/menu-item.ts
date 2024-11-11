import type { MenuItem } from "primevue/menuitem";
import {
  ADMIN_ADMIN,
  ADMIN_ADMIN_CREATE,
  ADMIN_COMPANY,
  ADMIN_COMPANY_CREATE,
  ADMIN_USER,
  ADMIN_USER_CREATE,
  COMPANY_INTERVIEW,
  COMPANY_INTERVIEW_SET_DATE,
  COMPANY_INTERVIEW_UPDATE_STATUS,
  COMPANY_JOB,
  COMPANY_JOB_CREATE,
  COMPANY_POST,
  COMPANY_POST_CREATE,
  COMPANY_PROFILE,
  USER_APPLICATION,
  USER_CONNECTOR,
  USER_JOB,
  USER_PROFILE,
  USER_RESUME,
  USER_TROUBLESHOOTING,
} from "./route";

export const MENU_USER: MenuItem[] = [
  {
    icon: "pi pi-home",
    route: "/",
  },
  {
    icon: "pi pi-users",
    route: USER_CONNECTOR,
  },
  {
    icon: "pi pi-search",
    route: USER_JOB,
  },
  {
    icon: "pi pi-file",
    route: USER_APPLICATION,
  },
  {
    icon: "pi pi-folder",
    route: USER_RESUME,
  },
  {
    icon: "pi pi-user",
    route: USER_PROFILE,
  },
  {
    icon: "pi pi-question-circle",
    route: USER_TROUBLESHOOTING,
  },
];

export const MENU_ITEM_LEFT_BAR: MenuItem[] = [
  {
    label: "Profile",
    url: USER_PROFILE,
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
        url: USER_JOB,
        icon: "pi pi-briefcase",
      },
      {
        label: "Application",
        url: USER_APPLICATION,
        icon: "pi pi-file",
      },
    ],
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
      },
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
      },
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
  {
    key: "profile",
    label: "Profile",
    icon: "pi pi-box",
    route: COMPANY_PROFILE,
  },
];

export const MENU_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "pi pi-home",
    route: "/admin",
  },
  {
    key: "users",
    label: "Users",
    icon: "pi pi-users",
    route: ADMIN_USER,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: ADMIN_USER_CREATE,
      },
    ],
  },
  {
    key: "companies",
    label: "Company",
    icon: "pi pi-building",
    route: ADMIN_COMPANY,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: ADMIN_COMPANY_CREATE,
      },
    ],
  },
  {
    key: "admins",
    label: "Admin",
    icon: "pi pi-id-card",
    route: ADMIN_ADMIN,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: ADMIN_ADMIN_CREATE,
      },
    ],
  },
];
