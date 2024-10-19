import { getListApi } from "~/api/user/application";
import type { ApplicationEntity } from "~/entities/user/application";
import type { MetaEntity } from "~/entities/meta";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  applications: ApplicationEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  applications: [],
};

export const applicationStore = defineStore("applicationStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getListApi(params);
      this.$state.applications = data;

      this.$state.meta = meta;
      this.$state.isSucceed = true;
      this.isLoading = false;
    },
  },
});
