export const getResumeListApi = (params: Object): Promise<any> => {
  return apiClient.get("/user-service/users/resumes", params);
};

export const uploadResumeApi = (data: FormData): Promise<any> => {
  return apiClient.post("/user-service/users/resumes/", data);
};

export const removeResumeApi = (id: number): Promise<any> => {
  return apiClient.delete(`/user-service/users/resumes/${id}/`);
};
