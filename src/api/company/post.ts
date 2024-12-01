export const getIndexPostApi = (params: Object): Promise<any> => {
  return apiCompany.get("/job-service/posts", params);
};

export const getListHashtagApi = (param: Object): Promise<any> => {
  return apiCompany.get("/other-service/hash-tag", param);
};

export const getDetailPostApi = (id: number): Promise<any> => {
  return fetch("/data/company/post.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const createPostApi = (data: FormData): Promise<any> => {
  return apiCompany.get("/job-service/posts", data);
};
