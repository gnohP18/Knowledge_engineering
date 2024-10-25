import { getIndexUserApi } from "~/api/admin/user";
import type { BasicUserEntity } from "~/entities/admin/user";
import type { MetaEntity } from "~/entities/meta";

interface State {
  isLoading: Boolean,
  isSucceed: Boolean,
  meta: MetaEntity | null,
  users: BasicUserEntity[],
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  users: []
};

export const UserStore = defineStore("UserStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { record, meta } = await getIndexUserApi(params).then(res => res.data);
      
      this.$state.users = record.data;
      this.$state.meta = record.meta;
      
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
