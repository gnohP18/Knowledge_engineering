import { loginApi } from "~/api/admin/auth";
import { ADMIN_LAST_WORKSPACE, ADMIN_TOKEN } from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { AdminLoginEntity } from "~/entities/admin/auth";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  errors: {},
};

export const AuthStore = defineStore("AuthStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Login Company
     *
     * @param companyLogin Object login
     */
    async login(adminLogin: AdminLoginEntity): Promise<any> {
      this.$state.isLoading = true;

      const lastWorkspace = getLastWorkspace(ADMIN_LAST_WORKSPACE);

      await loginApi(adminLogin)
        .then((result) => {
          const redirectUrl = lastWorkspace ?? "/admin";

          setToken(ADMIN_TOKEN, result.access_token);

          navigateTo(redirectUrl, { external: true });
        })
        .catch((err) => {
          this.$state.isLoading = false;

          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

      this.$state.isLoading = false;
    },
  },
});
