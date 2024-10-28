import axios from "axios";
import { USER_TOKEN } from "~/constants/authentication";
import type { DataPostEntity } from "~/entities/user/post";

export const getDetailApi = (): Promise<any> => {
  return apiClient.get(`/user-service/users/1`, {}, USER_TOKEN);
};

export const getSuggestConnectorApi = (): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/suggest-connector.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getSuggestConnectorListApi = (params: Object): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/user/suggest-connectors.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getIndexPostApi = (param: Object): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

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
  return fetch("/data/user/job.json")
    .then((res) => res.json())
    .then((d) => d.data);
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

export const searchJobApi = (param: Object): Promise<any> => {
  console.log(param);

  const data = axios.get("localhost:3000", { params: param });
  console.log(data);

  return fetch("/data/response/success.json").then((res) => res.json());
};
