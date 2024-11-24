export const getDetailJobApi = (id: number): Promise<any> => {
  return apiClient.get(`/job-service/jobs/${id}`, {});
};

export const applyJobApi = (id: number): Promise<any> => {
  return fetch("/data/response/success.json").then((res) => res.json());
};

export const searchJobApi = (params: Object): Promise<any> => {
  return apiClient.get(`/job-service/jobs`, params);
};
