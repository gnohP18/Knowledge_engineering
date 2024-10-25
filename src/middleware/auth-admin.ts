import { ADMIN_LAST_WORKSPACE, ADMIN_TOKEN } from "~/constants/authentication";
import { ADMIN_LOGIN } from "~/constants/route";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = getToken(ADMIN_TOKEN);

  if (!token) {
    return ADMIN_LOGIN;
  }

  setLastWorkspace(ADMIN_LAST_WORKSPACE ,to.fullPath);
});