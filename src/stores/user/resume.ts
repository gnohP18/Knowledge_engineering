import {
  getResumeListApi,
  removeResumeApi,
  uploadResumeApi,
} from "~/api/user/user";
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

      this.$state.resumes = data;
      this.$state.meta = meta;

      this.$state.isLoading = false;
    },

    /**
     * upload resume with info
     *
     * @param data Form data have resume
     */
    async uploadResume(data: FormData): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await uploadResumeApi(data)
        .then(() => {
          this.$state.isSucceed = true;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },

    async removeResume(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await removeResumeApi(id)
        .then(() => {
          this.$state.isSucceed = true;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },
  },
});
