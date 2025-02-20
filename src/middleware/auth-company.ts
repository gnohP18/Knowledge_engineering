import {
  COMPANY_LAST_WORKSPACE,
  COMPANY_TOKEN,
} from "~/constants/authentication";
import { COMPANY_LOGIN } from "~/constants/route";

export default defineNuxtRouteMiddleware((to) => {
  const token = getToken(COMPANY_TOKEN);

  if (!token) {
    return navigateTo(COMPANY_LOGIN);
  }

  setLastWorkspace(COMPANY_LAST_WORKSPACE, to.fullPath);
});
