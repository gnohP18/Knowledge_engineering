import { getMeApi } from "~/api/user/auth";
import {
  applyJobApi,
  createPostApi,
  getDetailJobApi,
  getDetailPostApi,
  getHashtagListApi,
  getIndexPostApi,
  getPositionNameListApi,
  getSuggestConnectorApi,
  getSuggestConnectorListApi,
  updateProfileApi,
} from "~/api/user/user";
import type { ErrorData } from "~/entities/api-error";
import type { MetaEntity } from "~/entities/meta";
import type {
  AttachmentJob,
  JobEntity,
  PositionEntity,
} from "~/entities/user/job";
import type {
  BasicPostEntity,
  DataPostEntity,
  HashtagEntity,
} from "~/entities/user/post";
import type { BasicResumeEntity } from "~/entities/user/resume";
import type { ConnectorEntity, UserEntity } from "~/entities/user/user";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  meta: MetaEntity | null;
  profile: UserEntity;
  positions: PositionEntity[];
  suggestConnectors: ConnectorEntity[];
  posts: BasicPostEntity[];
  post: BasicPostEntity;
  job: JobEntity;
  resumes: BasicResumeEntity[];
  attachmentJobs: AttachmentJob[];
  hashtags: HashtagEntity[];
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  meta: null,
  profile: {
    hashtag: [],
  },
  positions: [],
  job: {
    company: {},
  },
  suggestConnectors: [],
  posts: [],
  post: {},
  attachmentJobs: [],
  hashtags: [],
  resumes: [],
  errors: {},
};

export const userStore = defineStore("userStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * Get suggest connector card right bar
     */
    async getSuggestConnector(): Promise<any> {
      this.$state.isLoading = true;

      this.$state.suggestConnectors = await getSuggestConnectorApi();

      this.$state.isLoading = false;
    },

    /**
     * get index
     *
     * @param param Param pagination
     */
    async getSuggestConnectorList(param: Object): Promise<any> {
      this.$state.isLoading = true;

      this.$state.suggestConnectors = await getSuggestConnectorListApi(param);

      this.$state.isLoading = false;
    },

    /**
     * get index post base on hashtag
     *
     * @param param object has hashtag
     */
    async getIndexPost(param: Object): Promise<any> {
      this.$state.isLoading = true;

      this.$state.posts = [
        ...this.$state.posts,
        ...(await getIndexPostApi(param)),
      ];

      // test loading
      setTimeout(() => {
        this.$state.isLoading = false;
      }, 5000); // 5 giây
    },

    /**
     * Get Detail post by user
     * @param id post id
     */
    async getDetailPost(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getDetailPostApi(id)
        .then((result) => {
          this.$state.post = result.post;

          this.$state.attachmentJobs = result.attachment_jobs;
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
     * Get job detail
     * @param id id job
     */
    async getDetailJob(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getDetailJobApi(id)
        .then((result) => {
          this.$state.job = result;
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
     * Apply job
     *
     * @param jobId jobId apply job
     */
    async applyJob(jobId: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await applyJobApi(jobId)
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

    /**
     * get list hashtag
     */
    async getHashtagList(): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getHashtagListApi()
        .then((result) => {
          this.$state.hashtags = result;
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
     * Create post
     * @param data data Post Create & update
     */
    async createPost(data: DataPostEntity): Promise<any> {
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

    /**
     * Get index info profile
     *
     * @param paramPosition param pagination position
     */
    async getIndexProfile(paramPosition: Object): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getMeApi()
        .then((result) => {
          this.$state.profile = result.user_profile;
          this.$state.suggestConnectors = result.suggest_connector;
          this.$state.isSucceed = true;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });

      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getPositionNameListApi(paramPosition)
        .then((result) => {
          this.$state.positions = result.data;
        })
        .catch((err) => {
          this.$state.isSucceed = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoading = false;
        });
    },

    async connect(id: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;
    },

    /**
     * Update profile - update me
     *
     * @param data User entity data update
     */
    async updateProfile(data: FormData): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await updateProfileApi(data)
        .then(() => {
          this.$state.isSucceed = true;
          toastSuccess("Success", "Update profile successful");
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
