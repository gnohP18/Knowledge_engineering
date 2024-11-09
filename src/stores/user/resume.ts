import { getResumeListApi } from "~/api/user/user";
import type { ErrorData } from "~/entities/api-error";
import type { MetaEntity } from "~/entities/meta";
import type { BasicResumeEntity } from "~/entities/user/resume";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  resumes: BasicResumeEntity[];
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  resumes: [],
  errors: {},
};

export const userResumeStore = defineStore("userResumeStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Get list resume have pagination
     * @param params Object params like limit, page
     */
    async getResumeList(params: Object): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getResumeListApi(params);
      console.log(data);

      this.$state.resumes = data;
      this.$state.meta = meta;

      this.$state.isLoading = false;
    },
  },
});
