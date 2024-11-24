import type { DataConnector } from "~/entities/user/user";

export const getSuggestConnectorListApi = (params: Object): Promise<any> => {
  return apiClient.get("/user-service/relationships", params);
};

export const getConnectorFollowedApi = (params: Object): Promise<any> => {
  return apiClient.get("/user-service/relationships/list-is-followed", params);
};

export const connectApi = (data: DataConnector): Promise<any> => {
  return apiClient.post(
    "/user-service/relationships/connect-to-connector",
    data,
  );
};

export const getDetailConnectorAPi = (id: number): Promise<any> => {
  return apiClient.get(`/user-service/relationships/${id}`);
};
