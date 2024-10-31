import { getPositionNameListApi, searchJobApi } from "~/api/user/user";
import type { MetaEntity } from "~/entities/meta";
import type { PositionEntity, SearchingJobEntity } from "~/entities/user/job";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  jobs: SearchingJobEntity[];
  positions: PositionEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  jobs: [],
  positions: [],
};
export const jobStore = defineStore("jobStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Search job
     *
     * @param params Param search
     */
    async searchJob(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await searchJobApi(params);

      this.$state.jobs = data;
      this.$state.meta = meta;

      this.$state.isSucceed = true;
      this.isLoading = false;
    },

    async getPositionNameList(params: Object): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getPositionNameListApi(params);

      this.$state.positions = data;

      this.$state.isSucceed = true;
      this.isLoading = false;
    },
  },
});
