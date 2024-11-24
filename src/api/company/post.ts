export const getIndexPostApi = (params: Object): Promise<any> => {
  return fetch("/data/company/posts.json").then((res) => res.json());
};

export const getListHashtagApi = (param: Object): Promise<any> => {
  return apiCompany.get("/other-service/hash-tag", param);
};

export const getDetailPostApi = (id: number): Promise<any> => {
  return fetch("/data/company/post.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
