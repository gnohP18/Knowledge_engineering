import type { DataPostEntity } from "~/entities/user/post";

export const getDetailApi = (): Promise<any> => {
  return apiClient.get(`/user-service/users/1`, {});
};

export const getSuggestConnectorApi = (): Promise<any> => {
  return fetch("/data/user/suggest-connector.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getSuggestConnectorListApi = (params: Object): Promise<any> => {
  return fetch("/data/user/suggest-connectors.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getIndexPostApi = (param: Object): Promise<any> => {
  return fetch("/data/user/posts.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getDetailPostApi = (id: number): Promise<any> => {
  return fetch("/data/user/post.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getDetailJobApi = (id: number): Promise<any> => {
  return apiClient.get(`/job-service/jobs/${id}`, {});
};

export const applyJobApi = (id: number): Promise<any> => {
  return fetch("/data/response/success.json").then((res) => res.json());
};

export const getHashtagListApi = (): Promise<any> => {
  return fetch("/data/user/hashtags.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const createPostApi = (data: DataPostEntity): Promise<any> => {
  return fetch("/data/response/success.json").then((res) => res.json());
};

export const searchJobApi = (params: Object): Promise<any> => {
  return apiClient.get(`/job-service/jobs`, params);
};

export const getResumeListApi = (params: Object): Promise<any> => {
  return apiClient.get("/user-service/users/resumes", params);
};

export const getPositionNameListApi = (param: Object): Promise<any> => {
  return apiClient.get("/job-service/jobs/job-positions", param);
};

export const connectApi = (id: number): Promise<any> => {
  return apiClient.post("/user-service/relationships");
};
