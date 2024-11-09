import { getMeApi, loginApi } from "~/api/company/auth";
import {
  COMPANY_LAST_WORKSPACE,
  COMPANY_TOKEN,
} from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { CompanyLoginEntity } from "~/entities/company/auth";
import type { CompanyEntity } from "~/entities/company/company";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  errors: ErrorData;
  profile: CompanyEntity;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  profile: {},
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

          setToken(COMPANY_TOKEN, result.token);
          toastSuccess("Welcome", "Login Successfully");
          navigateTo(redirectUrl, { external: true });
        })
        .catch((err) => {
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },

    async getMe(): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getMeApi()
        .then((result) => {
          this.$state.isSucceed = true;
          this.$state.profile = result;
        })
        .catch((err) => {
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },
  },
});
