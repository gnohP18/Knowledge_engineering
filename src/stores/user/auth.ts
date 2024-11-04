import { getMeApi, loginApi } from "~/api/user/auth";
import { USER_LAST_WORKSPACE, USER_TOKEN } from "~/constants/authentication";
import type { ErrorData } from "~/entities/api-error";
import type { UserLoginEntity } from "~/entities/user/auth";
import type { ConnectorEntity, UserEntity } from "~/entities/user/user";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  errors: ErrorData;
  me: UserEntity;
  suggestConnectors: ConnectorEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  errors: {},
  me: { connect_company: [], connect_user: [], hashtag: [] },
  suggestConnectors: [],
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
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

      this.$state.isLoading = false;
    },

    /**
     * Logout
     */
    async logout(): Promise<any> {
      this.$state.isLoading = true;

      setToken(USER_TOKEN, "");

      const router = useRouter();
      await router.push("/");
      this.$state.isLoading = false;
    },

    /**
     * Get auth profile
     */
    async getMe(): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getMeApi()
        .then((result) => {
          this.$state.me = result.user_profile;
          this.$state.suggestConnectors = result.suggest_connector;
          this.$state.isSucceed = true;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

      this.$state.isLoading = false;
    },
  },
});
