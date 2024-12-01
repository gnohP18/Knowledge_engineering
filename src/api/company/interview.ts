export const getIndexInterviewApi = (params: Object): Promise<any> => {
  return apiCompany.get("/job-service/jobs/my-jobs", params);
};

export const getListApplicationApi = (
  jobId: number,
  params: Object,
): Promise<any> => {
  return apiCompany.get(
    `/interview-service/company-interview/jobs/${jobId}/applications`,
    params,
  );
};

export const getDetailApplicationApi = (id: number): Promise<any> => {
  return apiCompany.get(
    `/interview-service/company-interview/applications/${id}`,
  );
};

export const changeStatusApplicationApi = (entity: any): Promise<any> => {
  const formData = new FormData();
  formData.append("applicationId", entity.applicationId);
  return apiCompany.put(
    `/interview-service/company-interview/applications?NewStatus=${entity.status}
      &InterviewDateTime=${entity.interviewDateTime ? entity.interviewDateTime : ""}
      &OnboardDateTime=${entity.expectedOnboardDate ? entity.expectedOnboardDate : ""}
      &Note=${entity.note ? entity.note : ""}`,
    formData,
  );
};
