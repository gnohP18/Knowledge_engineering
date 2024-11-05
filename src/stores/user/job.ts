import { getPositionNameListApi, searchJobApi } from "~/api/user/user";
import type { ErrorData } from "~/entities/api-error";
import type { MetaEntity } from "~/entities/meta";
import type { PositionEntity, SearchingJobEntity } from "~/entities/user/job";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  jobs: SearchingJobEntity[];
  positions: PositionEntity[];
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  jobs: [],
  positions: [],
  errors: {},
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

      await searchJobApi(params)
        .then((result) => {
          this.$state.jobs = result.data;
          this.$state.meta = result.meta;
          this.$state.isSucceed = true;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          toastError("Error", "Something went wrong!!!");
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

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
