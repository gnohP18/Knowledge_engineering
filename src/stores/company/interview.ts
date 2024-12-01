import {
  changeStatusApplicationApi,
  getDetailApplicationApi,
  getIndexInterviewApi,
  getListApplicationApi,
} from "~/api/company/interview";
import { JOB_STATUS_PUBLISH } from "~/constants/job";
import type { ErrorData } from "~/entities/api-error";
import type {
  ApplicationEntity,
  BasicApplicationEntity,
} from "~/entities/company/application";
import type { BasicInterviewEntity } from "~/entities/company/interview";
import type { MetaEntity } from "~/entities/meta";
interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  interviews: BasicInterviewEntity[];
  applications: BasicApplicationEntity[];
  application: ApplicationEntity;
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  interviews: [],
  applications: [],
  application: {},
  errors: {},
};

export const InterviewStore = defineStore("InterviewStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;
      params = Object.assign(params, {
        JobStatus: JOB_STATUS_PUBLISH,
        Direction: "asc",
      });
      const { data, meta } = await getIndexInterviewApi(params);

      this.$state.interviews = data;
      this.$state.meta = meta;

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    },

    // async getDetail(id: string): Promise<any> {
    //   this.$state.isLoading = true;
    //   this.$state.isSucceed = false;

    //   this.$state.post = await getDetailPostApi(id);
    //   console.log(this.$state.post);

    //   this.$state.isSucceed = true;
    //   this.$state.isLoading = false;
    // }

    async getListApplication(id: number, params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getListApplicationApi(id, params).then((result) => {
        this.$state.applications = result.data;
        this.$state.meta = result.meta;
      });

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    },

    async getDetailApplication(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getDetailApplicationApi(id)
        .then((result) => {
          this.$state.application = result;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },

    async changeStatusApplication(entity: Object): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await changeStatusApplicationApi(entity)
        .then(() => {})
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

      this.$state.isLoading = false;
      this.$state.isSucceed = true;
    },
  },
});
