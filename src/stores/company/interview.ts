import { sleep } from "@whoj/utils-core";
import { getDetailApplicationApi, getIndexInterviewApi, getListApplicationApi } from "~/api/company/interview";
import type { ErrorData } from "~/entities/api-error";
import type { ApplicationEntity, BasicApplicationEntity } from "~/entities/company/application";
import type { BasicInterviewEntity } from "~/entities/company/interview";
import type { MetaEntity } from "~/entities/meta";
interface State {
  isLoading: Boolean,
  isSucceed: Boolean,
  meta: MetaEntity | null,
  interviews: BasicInterviewEntity[],
  applications: BasicApplicationEntity[],
  application: ApplicationEntity,
  errors: ErrorData
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  interviews: [],
  applications: [],
  application: {},
  errors: {}
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
      
      const { data, meta } = await getListApplicationApi(id, params);
      
      this.$state.applications = data;
      this.$state.meta = meta;
      
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
    }
  },
});
