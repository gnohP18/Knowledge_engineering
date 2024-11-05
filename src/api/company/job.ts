import type { JobEntity } from "~/entities/company/job";

export const getIndexJobApi = (params: Object): Promise<any> => {
  return apiCompany.get("/job-service/jobs/my-jobs", params);
};

export const getListPositionNameApi = (): Promise<any> => {
  return apiCompany.get("/job-service/jobs/job-positions?limit=100", {});
};

export const getListJobAttributeApi = (): Promise<any> => {
  return apiCompany.get("/job-service/jobs/job-attributes?limit=100", {});
};

export const getDetailJobApi = (id: string): Promise<any> => {
  return apiCompany.get(`/job-service/jobs/${id}`, {});
};

export const createJobApi = (data: JobEntity): Promise<any> => {
  return apiCompany.post("/job-service/jobs", data);
};

export const updateJobApi = (id: string, entity: JobEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

  return fetch("/data/response/success.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
