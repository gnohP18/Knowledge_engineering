export const getListApi = (params: Object): Promise<any> => {
  return apiClient.get("/interview-service/user-interview/applications");
};
