import { loginApi } from "~/api/user/auth";
import { USER_LAST_WORKSPACE, USER_TOKEN } from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { UserLoginEntity } from "~/entities/user/auth";

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
     * Login User
     *
     * @param userLogin Object login
     */
    async login(userLogin: UserLoginEntity): Promise<any> {
      this.$state.isLoading = true;

      const lastWorkspace = getLastWorkspace(USER_LAST_WORKSPACE);

      await loginApi(userLogin)
        .then((result) => {
          const redirectUrl = lastWorkspace ?? "/";

          setToken(USER_TOKEN, result.token);

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
