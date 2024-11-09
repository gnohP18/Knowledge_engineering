import { USER_LAST_WORKSPACE, USER_TOKEN } from "~/constants/authentication";

export default defineNuxtRouteMiddleware((to) => {
  const token = getToken(USER_TOKEN);

  if (token) {
    return navigateTo(getLastWorkspace(USER_LAST_WORKSPACE));
  }
});
