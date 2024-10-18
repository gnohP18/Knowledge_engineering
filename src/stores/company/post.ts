import { getDetailPostApi, getIndexPostApi } from "~/api/company/post";
import type { BasicPostEntity, PostEntity } from "~/entities/company/post";
import type { MetaEntity } from "~/entities/meta";
import { delayFunc } from "~/utils/common";
interface State {
  isLoading: Boolean,
  isSucceed: Boolean,
  meta: MetaEntity | null,
  posts: BasicPostEntity[],
  post: PostEntity;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  posts: [],
  post: {}
};

export const PostStore = defineStore("PostStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getIndexPostApi(params);
      
      this.$state.posts = data;
      this.$state.meta = meta;
      
      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    },

    async getDetail(id: string): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      this.$state.post = await getDetailPostApi(id);
      console.log(this.$state.post);
      

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    }
  },
});
