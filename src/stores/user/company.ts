import { getListApi, getDetailApi } from "~/api/user/company";
import type {
  BasicCompanyEntity,
  CompanyEntity,
} from "~/entities/user/company";
import type { MetaEntity } from "~/entities/meta";
import type { BasicJobEntity } from "~/entities/user/job";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  companies: BasicCompanyEntity[];
  company: CompanyEntity;
  recentlyPostedJobs: BasicJobEntity[];
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  companies: [],
  company: {},
  recentlyPostedJobs: [],
};

export const companyStore = defineStore("companyStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Get list company
     *
     * @param params pagination params
     */
    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;

      const { data, meta } = await getListApi(params);
      this.$state.companies = data;
      this.$state.meta = meta;

      this.$state.isLoading = false;
    },

    /**
     * Get info and list recently posted job
     *
     * @param id company id
     */
    async getDetail(id: string): Promise<any> {
      this.$state.isLoading = true;

      await getDetailApi(id).then((result) => {
        console.log(result);

        this.$state.company = result[0];
        // this.$state.recentlyPostedJobs = data.recently_posted_job;
      });

      this.$state.isLoading = false;
    },
  },
});
