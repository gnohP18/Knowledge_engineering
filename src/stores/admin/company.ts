import { getIndexCompanyApi } from "~/api/admin/company";
import type { BasicCompanyEntity } from "~/entities/admin/company";
import type { MetaEntity } from "~/entities/meta";

interface State {
  isLoading: Boolean,
  isSucceed: Boolean,
  meta: MetaEntity | null,
  companies: BasicCompanyEntity[],
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  companies: []
};

export const CompanyStore = defineStore("CompanyStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getIndexCompanyApi(params);
      
      this.$state.companies = data;
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
  },
});
