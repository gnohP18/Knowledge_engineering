export const getDetailJobApi = (id: number): Promise<any> => {
  return apiClient.get(`/job-service/jobs/${id}`, {});
};

export const applyJobApi = (id: number, resumeId: number): Promise<any> => {
  return apiClient.post("/interview-service/interview", {
    jobId: id,
    resumeId,
  });
};

export const searchJobApi = (params: Object): Promise<any> => {
  return apiClient.get(`/job-service/jobs`, params);
};
