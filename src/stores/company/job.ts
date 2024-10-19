import { getIndexJobApi, getListPositionNameApi } from "~/api/company/job";
import type { ErrorData } from "~/entities/api-error";
import type {
  BasicJobEntity,
  PositionNameEntity,
} from "~/entities/company/job";
import type { MetaEntity } from "~/entities/meta";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  errors: ErrorData;
  jobs: BasicJobEntity[];
  positionNames: PositionNameEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  jobs: [],
  positionNames: [],
  errors: {},
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
    },

    async getIndexCreate(): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getListPositionNameApi()
        .then((result) => {
          this.$state.isSucceed = true;
          this.$state.positionNames = result;          
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
