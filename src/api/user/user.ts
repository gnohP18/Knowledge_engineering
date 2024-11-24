export const getPositionNameListApi = (param: Object): Promise<any> => {
  return apiClient.get("/job-service/jobs/job-positions", param);
};

export const updateProfileApi = (data: FormData): Promise<any> => {
  return apiClient.put(`/user-service/users/update/`, data);
};

export const getListHashtagApi = (param: Object): Promise<any> => {
  return apiClient.get("/other-service/hash-tag", param);
};
