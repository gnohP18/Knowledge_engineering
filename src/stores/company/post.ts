import {
  createPostApi,
  getDetailPostApi,
  getIndexPostApi,
  getListHashtagApi,
} from "~/api/company/post";
import type { ErrorData } from "~/entities/api-error";
import type { BasicPostEntity, PostEntity } from "~/entities/company/post";
import type { MetaEntity } from "~/entities/meta";
interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  posts: BasicPostEntity[];
  post: PostEntity;
  hashtag: string[];
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  posts: [],
  hashtag: [],
  post: {},
  errors: {},
};

export const PostStore = defineStore("PostStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Get list Post follow keyword, pagination
     *
     * @param params param pagination
     */
    async getList(params: Object = {}): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      const { data, meta } = await getIndexPostApi(params);

      this.$state.posts = data;
      this.$state.meta = meta;

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    },

    async getIndexForm(): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getListHashtagApi({})
        .then((result) => {
          this.$state.hashtag = result;
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

    /**
     * Get info post
     * @param id post id
     */
    async getDetail(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      this.$state.post = await getDetailPostApi(id);
      console.log(this.$state.post);

      this.$state.isSucceed = true;
      this.$state.isLoading = false;
    },

    async createPost(data: FormData): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await createPostApi(data)
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
