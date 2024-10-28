import { searchJobApi } from "~/api/user/user";
import type { MetaEntity } from "~/entities/meta";
import type { SearchingJobEntity } from "~/entities/user/job";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  jobs: SearchingJobEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  jobs: [],
};
export const jobStore = defineStore("jobStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async searchJob(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await searchJobApi(params);
      this.$state.jobs = data;
      this.$state.meta = meta;
      this.$state.isSucceed = true;
      this.isLoading = false;
    },
  },
});
