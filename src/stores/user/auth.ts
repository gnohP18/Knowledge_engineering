import { loginApi, signupApi } from "~/api/user/auth";
import { USER_TOKEN } from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { UserLoginEntity, UserSignupEntity } from "~/entities/user/auth";

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

      const lastWorkspace = getLastWorkspace();

      await loginApi(userLogin)
        .then((result) => {
          const redirectUrl = lastWorkspace ?? "/";

          setToken(USER_TOKEN, result.access_token);

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
    async signup(userSignup: UserSignupEntity): Promise<any> {
      this.$state.isLoading = true;

      await signupApi(userSignup)
        .then(() => {
          navigateTo("/login", { external: true });

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
