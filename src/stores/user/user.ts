import {
  getDetailApi,
  getSuggestConnectorApi,
  getSuggestConnectorListApi,
} from "~/api/user/user";
import type { MetaEntity } from "~/entities/meta";
import type { ConnectorEntity, UserEntity } from "~/entities/user/user";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  user: UserEntity;
  suggestConnectors: ConnectorEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  user: {
    connect_company: [],
    connect_user: [],
    hashtag: [],
  },
  suggestConnectors: [],
};

export const userStore = defineStore("userStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getDetail(): Promise<any> {
      this.$state.isLoading = true;

      this.$state.user = await getDetailApi();

      this.$state.isLoading = false;
    },

    /**
     * Get suggest connector card right bar
     */
    async getSuggestConnector(): Promise<any> {
      this.$state.isLoading = true;

      this.$state.suggestConnectors = await getSuggestConnectorApi();

      this.$state.isLoading = false;
    },

    /**
     * get index
     *
     * @param param Param pagination
     */
    async getSuggestConnectorList(param: Object): Promise<any> {
      this.$state.isLoading = true;

      this.$state.suggestConnectors = await getSuggestConnectorListApi(param);

      this.$state.isLoading = false;
    },
  },
});
