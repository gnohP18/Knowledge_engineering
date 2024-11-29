export const getIndexInterviewApi = (params: Object): Promise<any> => {
  return apiCompany.get("/job-service/jobs/my-jobs", params);
};

export const getListApplicationApi = (
  jobId: number,
  params: Object,
): Promise<any> => {
  return apiCompany.get(
    `/interview-service/interview/jobs/${jobId}/applications`,
    params,
  );
};

export const getDetailApplicationApi = (id: number): Promise<any> => {
  return fetch("/data/company/application.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
