import { USER_LAST_WORKSPACE } from "~/constants/authentication";

/**
 * Set token authentication
 *
 * @param key Local storage key
 * @param token token
 */
export const setToken = (key: string, token: string) => {
  console.log({ token });

  localStorage.setItem(key, token);
};

/**
 * Get local storage key authentication
 *
 * @param key Local storage key
 * @returns token
 */
export const getToken = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * Get last workspace user
 *
 * @returns USER_LAST_WORKSPACE
 */
export const getLastWorkspace = () => {
  return localStorage.getItem(USER_LAST_WORKSPACE);
};

/**
 * Set last workspace user
 *
 * @param lastWorkspace Last workspace user
 */
export const setLastWorkspace = (lastWorkspace: string) => {
  localStorage.setItem(USER_LAST_WORKSPACE, lastWorkspace);
};

/**
 * Check authentication of authenticator
 *
 * @param type type of authenticator
 * @returns true if have token, else false
 */
export const checkAuth = (type: string): Boolean => {
  return !!getToken(type);
};
