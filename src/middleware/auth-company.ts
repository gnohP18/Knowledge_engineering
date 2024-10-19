import { COMPANY_LAST_WORKSPACE, COMPANY_TOKEN } from "~/constants/authentication";
import { COMPANY_LOGIN } from "~/constants/route";

export default defineNuxtRouteMiddleware(async (to) => {
  const token = getToken(COMPANY_TOKEN);

  if (!token) {
    return COMPANY_LOGIN;
  }

  setLastWorkspace(COMPANY_LAST_WORKSPACE, to.fullPath);
});
