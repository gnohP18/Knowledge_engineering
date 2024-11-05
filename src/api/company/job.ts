import type { JobEntity } from "~/entities/company/job";

export const getIndexJobApi = (params: Object): Promise<any> => {
  // return fetch("/data/company/jobs.json").then((res) => res.json());
  return apiCompany.get("/job-service/jobs", params);
};

export const getListPositionNameApi = (): Promise<any> => {
  return fetch("/data/company/position_name.json")
    .then((res) => res.json())
    .then((d) => d.data);
};

export const getListJobAttributeApi = (): Promise<any> => {
  return fetch("/data/company/job_attributes.json")
    .then((res) => res.json())
    .then((d) => d.data);

  // return apiClient.get(
  //   "/job-service/jobs/job-attributes?limit=100",
  //   {},
  //   COMPANY_TOKEN,
  // );
};

export const getDetailJobApi = (id: string): Promise<any> => {
  return apiCompany.get(`/job-service/jobs/${id}`, {});
};

export const createJobApi = (data: JobEntity): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });

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
