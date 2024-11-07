import {
  COMPANY_LAST_WORKSPACE,
  COMPANY_TOKEN,
} from "~/constants/authentication";

export default defineNuxtRouteMiddleware((to) => {
  const token = getToken(COMPANY_TOKEN);

  if (token) {
    return navigateTo(getLastWorkspace(COMPANY_LAST_WORKSPACE));
  }
});
