import type { MenuItem } from "primevue/menuitem";

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
    key: "posts",
    label: "Posts",
    icon: "pi pi-th-large",
    route: "/company/posts",
    active: true,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: "/company/posts/create",
      }
    ],
  },
  {
    key: "jobs",
    label: "Jobs",
    icon: "pi pi-briefcase",
    route: "/company/jobs",
    active: true,
    items: [
      {
        label: "Create",
        icon: "pi pi-plus",
        route: "/company/jobs/create",
      }
    ],
  },
  {
    key: "interviews",
    label: "Interview",
    icon: "pi pi-file",
    route: "/company/interviews",
    items: [
      {
        label: "Set date",
        icon: "pi pi-plus",
        route: "/company/interviews/create",
      },
      {
        label: "Update status",
        icon: "pi pi-file-edit",
        route: "/company/interviews/update-status",
      },
    ],
  },
];
