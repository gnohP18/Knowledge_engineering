import { loginApi } from "~/api/company/auth";
import { COMPANY_LAST_WORKSPACE, COMPANY_TOKEN } from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { CompanyLoginEntity } from "~/entities/company/auth";

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
    async login(companyLogin: CompanyLoginEntity): Promise<any> {
      this.$state.isLoading = true;

      const lastWorkspace = getLastWorkspace(COMPANY_LAST_WORKSPACE);

      await loginApi(companyLogin)
        .then((result) => {
          const redirectUrl = lastWorkspace ?? "/company";

          setToken(COMPANY_TOKEN, result.access_token);

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
