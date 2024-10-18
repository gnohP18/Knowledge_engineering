import { USER_TOKEN } from "~/constants/authentication";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = getToken(USER_TOKEN);

  if (!token) {
    return "/login";
  }

  setLastWorkspace(to.fullPath);
});
