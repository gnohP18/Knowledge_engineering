export const getIndexInterviewApi = (params: Object): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });
  // return fetch("/data/company/interviews.json").then((res) => res.json());
  return apiCompany.get("/interview-service/interview/jobs", params);
};

export const getListApplicationApi = (
  jobId: number,
  params: Object,
): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });
  return fetch("/data/company/applications.json").then((res) => res.json());
};

export const getDetailApplicationApi = (id: number): Promise<any> => {
  // return axios
  //   .post(`${API_URL}/model/predict`, { text: text })
  //   .then((result) => {
  //     return result.data
  //   });
  return fetch("/data/company/application.json")
    .then((res) => res.json())
    .then((d) => d.data);
};
