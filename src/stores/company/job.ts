import { getIndexJobApi } from "~/api/company/job";
import type { BasicJobEntity } from "~/entities/company/job";
import type { MetaEntity } from "~/entities/meta";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  jobs: BasicJobEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  jobs: [],
};

export const JobStore = defineStore("JobStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getIndexJobApi(params);
      this.$state.jobs = data;
      this.$state.meta = meta;
      
      this.$state.isSucceed = true;
      this.isLoading = false;
    },

    async getDetail(id: string): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      delayFunc(2000);

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    }
  },
});
