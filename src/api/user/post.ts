import type { DataPostEntity } from "~/entities/user/post";

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

export const getListHashtagApi = (param: Object): Promise<any> => {
  return apiCompany.get("/other-service/hash-tag", param);
};

export const createPostApi = (data: DataPostEntity): Promise<any> => {
  return fetch("/data/response/success.json").then((res) => res.json());
};
