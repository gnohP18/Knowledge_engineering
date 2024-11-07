import { USER_LAST_WORKSPACE, USER_TOKEN } from "~/constants/authentication";
import { USER_LOGIN } from "~/constants/route";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = getToken(USER_TOKEN);

  if (!token) {
    return USER_LOGIN;
  }

  setLastWorkspace(USER_LAST_WORKSPACE, to.fullPath);
});
