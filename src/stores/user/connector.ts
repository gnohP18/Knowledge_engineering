import {
  connectApi,
  getDetailConnectorAPi,
  getSuggestConnectorListApi,
  getUserSearchGlobalApi,
} from "~/api/user/connector";
import {
  CONNECTOR_TYPE_COMPANY,
  CONNECTOR_TYPE_USER,
  MAPPING_QUERY_OPTIONS,
} from "~/constants/common";
import type { ErrorData } from "~/entities/api-error";
import type { MetaEntity } from "~/entities/meta";
import type { CompanyEntity } from "~/entities/user/company";
import type {
  ConnectorEntity,
  DataConnector,
  UserEntity,
} from "~/entities/user/user";

interface State {
  isLoading: Boolean;
  isSucceed: Boolean;
  isLoadingConnect: Boolean;
  isSucceedConnect: Boolean;
  meta: MetaEntity | null;
  connectors: ConnectorEntity[];
  followers: ConnectorEntity[];
  connectorUser: UserEntity;
  connectorCompany: CompanyEntity;
  errors: ErrorData;
}

const defaultState: State = {
  isLoading: false,
  isSucceed: false,
  isLoadingConnect: false,
  isSucceedConnect: false,
  meta: null,
  connectors: [],
  connectorUser: {},
  connectorCompany: {},
  followers: [],
  errors: {},
};
export const userStageConnectorStore = defineStore("userStageConnectorStore", {
  state: (): State => Object.assign(defaultState, getErrorObjectStore()),

  actions: {
    resetState() {
      this.$state = defaultState;
    },

    /**
     * get index
     *
     * @param param Param pagination
     */
    async getSuggestConnectorList(
      queryOption: number,
      params: Object,
      isGlobalSearch: boolean = false,
    ): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = true;
      params = Object.assign(params, {
        type: MAPPING_QUERY_OPTIONS[queryOption],
      });
      if (!isGlobalSearch) {
        await getSuggestConnectorListApi(params)
          .then((result) => {
            this.$state.connectors = result.data;
            this.$state.meta = result.meta;
          })
          .catch((err) => {
            this.$state.isSucceed = false;
            this.$state.errors = handleApiErrors(err);
          })
          .finally(() => {
            this.$state.isLoading = false;
          });
      } else {
        await getUserSearchGlobalApi(params)
          .then((result) => {
            this.$state.connectors = result.data;
            this.$state.meta = result.meta;
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

    /**
     * connect to another user
     *
     * @param connectorId connector id will be follow
     * @param connectorType connector type will be followed
     * @param status status will be apply for this connector
     */
    async connect(
      connectorId: number,
      connectorType: number,
      status: number,
    ): Promise<any> {
      this.$state.isLoadingConnect = true;
      this.$state.isSucceedConnect = false;

      const data: DataConnector = {
        user_id: connectorId,
        user_type: connectorType,
        status: status,
      };

      await connectApi(data)
        .then(() => {
          this.$state.isSucceedConnect = true;
        })
        .catch((err) => {
          this.$state.isSucceedConnect = false;
          this.$state.errors = handleApiErrors(err);
        })
        .finally(() => {
          this.$state.isLoadingConnect = false;
        });
    },

    /**
     * get connector by type
     *
     * @param id relationship_id from relationship table
     * @param type connector type
     */
    async getDetailConnector(id: number, type: number): Promise<any> {
      this.$state.isLoading = true;
      this.$state.isSucceed = false;

      await getDetailConnectorAPi(id)
        .then((result) => {
          switch (type) {
            case CONNECTOR_TYPE_USER:
              const dataUser: UserEntity = result.profile_connector;
              dataUser.relationship_id = result.relationship_id;
              dataUser.relationship_type = result.relationship_type;
              this.$state.connectorUser = result.profile_connector;
              break;

            case CONNECTOR_TYPE_COMPANY:
              const dataCompany: CompanyEntity = result.profile_connector;
              dataCompany.relationship_id = result.relationship_id;
              dataCompany.relationship_type = result.relationship_type;
              this.$state.connectorCompany = dataCompany;
              break;

            default:
              break;
          }

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
